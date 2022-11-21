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
  };
  internal: {
    contentFilePath: string;
  };
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
    {
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

  result.data.allMdx.edges.forEach(({ node }: { node: ITemplatedNode }) => {
    const parentDirs: string = node.parent.relativeDirectory;
    const contentType: string = node.parent.relativeDirectory.split(path.sep)[0];
    const pageName: string = node.parent.name;
    const pageIdentier: string = node.frontmatter.slug || pageName;

    // TODO: Make page-specific templates more general
    const templateName = pageName === "index" ? "template-index.tsx" : "template-default.tsx";
    const pagePath = pageName == "index" ? `${parentDirs}/` : `${parentDirs}/${pageIdentier}/`;
    const template = path.resolve("src", "pages", contentType, templateName);
    createPage({
      path: pagePath,
      component: `${template}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        id: node.id,
      },
    });
  });
};
