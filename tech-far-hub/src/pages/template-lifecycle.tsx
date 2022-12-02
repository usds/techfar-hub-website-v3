import { Grid, SideNav } from "@trussworks/react-uswds";
import type { HeadFC, PageProps } from "gatsby";
import { graphql, Link } from "gatsby";
import * as React from "react";
import Layout from "../components/layout";
import { Alert } from "../components/alert";
import { IPageContext } from "../types";
import { DeepPick } from "ts-deep-pick";
import { MDXProvider } from "@mdx-js/react";

type TableOfContents = { currentPage: { tableOfContents: Record<string, ITOCItem[]> } };
type LifecycleCurrentPage = DeepPick<Queries.LifecycleInnerPageQuery, "currentPage.!tableOfContents"> & TableOfContents;

type LifecycleInnerPageQuery = Omit<Queries.LifecycleInnerPageQuery, "currentPage"> & LifecycleCurrentPage;

type LifecycleInnerPageProps = PageProps<LifecycleInnerPageQuery, IPageContext>;

interface ITOCItem {
  url: string;
  title: string;
}

const LifecycleInnerPage: React.FC<LifecycleInnerPageProps> = ({
  data,
  children,
  pageContext,
}: LifecycleInnerPageProps) => {
  const currentSlug = data.currentPage?.frontmatter?.slug;
  const tocLinks = data.currentPage?.tableOfContents?.items.map((item: ITOCItem) => {
    return (
      <a href={item.url} key={item.url} className="font-ui-3xs">
        {item.title}
      </a>
    );
  });
  const siblingLinks = data.siblings?.nodes.map(({ frontmatter }) => {
    if (frontmatter && frontmatter.slug && frontmatter.heading) {
      if (frontmatter.slug === currentSlug && frontmatter.slug !== "index") {
        return (
          <>
            <a href="#" className="usa-current" key="current">
              {frontmatter.heading}
            </a>
            <SideNav items={tocLinks}></SideNav>
          </>
        );
      } else if (frontmatter.slug !== "index") {
        return <Link to={`${pageContext.parentPath}/${frontmatter.slug}`}>{frontmatter.heading}</Link>;
      }
    }
  });
  const components = { Alert };
  return (
    <Layout breadCrumbs={pageContext.breadCrumbs}>
      <h1>{data.currentPage?.frontmatter?.heading}</h1>
      <hr className="text-accent-warm " />
      <Grid row gap={2}>
        <Grid tablet={{ col: 2 }}>
          <div className="position-sticky top-0">
            <SideNav items={siblingLinks}></SideNav>
          </div>
        </Grid>
        <Grid tablet={{ col: 10 }}>
          <MDXProvider components={components}>{children}</MDXProvider>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default LifecycleInnerPage;

export const Head: HeadFC = () => <title>TechFAR Hub</title>;

export const query = graphql`
  query LifecycleInnerPage($id: String, $parentPathRegex: String) {
    currentPage: mdx(id: { eq: $id }) {
      frontmatter {
        heading
        slug
      }
      tableOfContents(maxDepth: 2)
    }
    siblings: allMdx(
      filter: { internal: { contentFilePath: { regex: $parentPathRegex } } }
      sort: { frontmatter: { nav_weight: ASC } }
    ) {
      nodes {
        frontmatter {
          slug
          heading
        }
      }
    }
  }
`;
