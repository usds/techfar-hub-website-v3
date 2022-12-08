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
    template?: string;
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

interface IBreadcrumb {
  label: string;
  path: string;
}

interface IPageContext {
  id: string;
  breadCrumbs: IBreadcrumb[];
  pathParts: string[];
  parentPath: string;
  parentPathRegex: string;
  isIndex: boolean;
}

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result: IGraphQLTemplateNodeResult = await graphql(`
    query CreatePages {
      allMdx(
        filter: {
          internal: { contentFilePath: { glob: "!*components" } }
          frontmatter: { page_type: { ne: "homepage" } }
        }
      ) {
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
              template
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
  const getHeadingForPath = (path: string): string => {
    for (let node of nodes) {
      if (path === "/") return "Home";
      if (node.pagePath === path) return node.heading || path;
    }
    return path;
  };

  nodes.forEach((node: IEnhancedTemplatedNode) => {
    const contentType: string = node.parent.relativeDirectory.split(path.sep)[0];

    const defaultTemplateName = node.pageName === "index" ? "index" : "default";
    const templateName = node.frontmatter?.template ? node.frontmatter?.template : defaultTemplateName;
    const pagePath = node.pagePath;
    const template = path.resolve("src", "pages", `template-${templateName}.tsx`);
    const pathParts = node.pagePath.replace(/\/$/, "").split("/");
    const breadCrumbPaths = pathParts.reduce(
      (accumulator: string[], currentValue: string) => [
        ...accumulator,
        [accumulator[accumulator.length - 1], currentValue, ""].join("/").replace("//", "/"),
      ],
      []
    );
    const breadCrumbHeadings = breadCrumbPaths.map(getHeadingForPath);
    const breadCrumbs: IBreadcrumb[] = breadCrumbPaths.map((path, i) => ({
      path: path,
      label: breadCrumbHeadings[i],
    }));
    const isIndex = node.pageName === "index";
    let parentPath: string;
    if (node.pageName === "index") {
      parentPath = pathParts.join("/");
    } else {
      parentPath = pathParts.slice(0, -1).join("/");
    }
    const parentPathRegex = `/${parentPath.replace("/", "\\/")}\\/.*/`;
    const context: IPageContext = {
      id: node.id,
      breadCrumbs,
      pathParts,
      parentPath,
      parentPathRegex,
      isIndex,
    };
    createPage({
      path: pagePath,
      component: `${template}?__contentFilePath=${node.internal.contentFilePath}`,
      context,
    });
  });
};

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type Mdx implements Node { frontmatter: Frontmatter }
    type Frontmatter {
      media_image: String
    }
  `;
  createTypes(typeDefs);
};
