import type { GatsbyNode } from "gatsby";
import path from "path";
import _ from "lodash";

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
    link?: string;
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
  pagesMdx: {
    edges: ReadonlyArray<{ readonly node: ITemplatedNode }>;
  };
  tagsGroup: {
    group: {
      fieldValue: string;
    }[];
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
  filePath: string;
  parentPathRegex: string;
  childPathRegex: string;
  isIndex: boolean;
  pagePath: string;
}

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result: IGraphQLTemplateNodeResult = await graphql(`
    query CreatePages {
      pagesMdx: allMdx(
        filter: {
          internal: { contentFilePath: { glob: "!*promos" } }
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
              link
            }
            internal {
              contentFilePath
            }
          }
        }
      }
      tagsGroup: allMdx(limit: 2000) {
        group(field: { frontmatter: { tags: SELECT } }) {
          fieldValue
        }
      }
    }
  `);

  if (result.errors || !result.data) {
    reporter.panicOnBuild(`Error while running page GraphQL query.`);
    return;
  }

  const nodes: IEnhancedTemplatedNode[] = result.data.pagesMdx.edges.map(({ node }: { node: ITemplatedNode }) => {
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

  nodes
    .filter((node: IEnhancedTemplatedNode) => !node.frontmatter.link)
    .forEach((node: IEnhancedTemplatedNode) => {
      const defaultTemplateName = "default";
      const templateName = node.frontmatter?.template ? node.frontmatter?.template : defaultTemplateName;
      const pagePath = node.pagePath;
      const filePath = node.parent.relativePath;
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
      parentPath = pathParts.slice(0, -1).join("/");
      const parentPathRegex = `/${parentPath.replace(
        "/",
        "\\/"
      )}\\/(?!index.md.)[A-Za-z0-9-.]+(\\/index.md|\\/index.mdx|$)/`;
      const childPathRegex = `/${pagePath.replace("/", "\\/")}.*/`;
      const context: IPageContext = {
        id: node.id,
        breadCrumbs,
        pathParts,
        parentPath,
        parentPathRegex,
        childPathRegex,
        filePath,
        isIndex,
        pagePath,
      };
      createPage({
        path: pagePath,
        component: `${template}?__contentFilePath=${node.internal.contentFilePath}`,
        context,
      });
    });
  const tags = result.data.tagsGroup.group;

  // Make tag pages
  tags.forEach((tag) => {
    const template = path.resolve("src", "pages", `template-tag.tsx`);
    const pagePath = `/tags/${_.kebabCase(tag.fieldValue)}`;
    createPage({
      path: pagePath,
      component: template,
      context: { tag: tag.fieldValue, pagePath },
    });
  });
};

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type Mdx implements Node { 
      frontmatter: Frontmatter 
    }
    type Frontmatter {
      media_image: String
      slug: String
      heading: String
      meta_title: String
      meta_description: String
      promo_description: String
      robots: String
      canonical: String
      link: String
      tags: [String]
    }
    type ComponentFrontmatter {
      slug: String
      heading: String
      promo_type: String
      nav_weight: Int
      media_image: File @fileByRelativePath
      media_alt: String
      link: String
      visible: Boolean
    }
    type MarkdownRemark implements Node {
      frontmatter: ComponentFrontmatter 
    }
  `;
  createTypes(typeDefs);
};
