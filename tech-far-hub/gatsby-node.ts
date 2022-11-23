import type { GatsbyNode } from "gatsby";
import path from "path";

interface ITemplatedNode {
  id: string;
  parent: {
    id: string;
    name: string;
    base: string;
    relativeDirectory: string;
    relativePath: string;
  };
  frontmatter: {
    slug?: string;
    heading?: string;
  };
  internal: {
    contentFilePath: string;
  };
}

interface IEnhancedTemplatedNode extends ITemplatedNode {
  pagePath: string;
  parentDirs: string;
  pageName: string;
  pageIdentifier: string;
  heading?: string;
}

interface ITemplateNodeResultSet {
  allMdx: {
    edges: ReadonlyArray<{ readonly node: ITemplatedNode }>;
  };
}

interface IGraphQLTemplateNodeResult {
  errors?: any;
  data?: ITemplateNodeResultSet;
}

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result: IGraphQLTemplateNodeResult = await graphql(`
    query CreatePages {
      allMdx {
        edges {
          node {
            id
            parent {
              id
              ... on File {
                id
                name
                base
                relativeDirectory
                relativePath
              }
            }
            frontmatter {
              slug
              heading
            }
            internal {
              contentFilePath
            }
          }
        }
      }
    }
  `);

  if (result.errors || !result.data) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const nodes: IEnhancedTemplatedNode[] = result.data.allMdx.edges.map(({ node }: { node: ITemplatedNode }) => {
    const parentDirs: string = node.parent.relativeDirectory;
    const pageName: string = node.parent.name;
    const pageIdentifier: string = node.frontmatter.slug || pageName;

    const pagePath = pageName == "index" ? `/${parentDirs}/` : `/${parentDirs}/${pageIdentifier}/`;
    const heading = node.frontmatter?.heading;
    return {
      ...node,
      pagePath,
      parentDirs,
      pageName,
      pageIdentifier,
      heading,
    };
  });
  const getHeadingForPath = (path: string) => {
    for (let node of nodes) {
      if (path === "/") return "Home";
      if (node.pagePath === path) return node.heading;
    }
    return undefined;
  };

  nodes.forEach((node: IEnhancedTemplatedNode) => {
    const contentType: string = node.parent.relativeDirectory.split(path.sep)[0];

    // TODO: Make page-specific templates more general
    const templateName = node.pageName === "index" ? "template-index.tsx" : "template-default.tsx";
    const pagePath = node.pagePath;
    const template = path.resolve("src", "pages", contentType, templateName);
    const pathParts = node.pagePath.replace(/\/$/, "").split("/");
    const breadCrumbPaths = pathParts.reduce(
      (accumulator: string[], currentValue: string) => [
        ...accumulator,
        [accumulator[accumulator.length - 1], currentValue, ""].join("/").replace("//", "/"),
      ],
      []
    );
    const breadCrumbHeadings = breadCrumbPaths.map(getHeadingForPath);
    const breadCrumbs = breadCrumbPaths.map((path, i) =>
      Object.fromEntries([
        ["path", path],
        ["label", breadCrumbHeadings[i]],
      ])
    );
    console.log({
      id: node.id,
      breadCrumbs,
      pathParts,
    });
    createPage({
      path: pagePath,
      component: `${template}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        id: node.id,
        breadCrumbs,
        pathParts,
      },
    });
  });
};
