import type { HeadFC } from "gatsby";
import { graphql } from "gatsby";
import * as React from "react";
import PageLayoutNav from "../components/page-layout-nav";
import MDXContent from "../components/mdxcontent";
import { TOCEnhancedQueryPageProps } from "../types";
import SiteLayout from "../components/site-layout";
import { SEO } from "../components/seo";

type LifecycleInnerPageProps = TOCEnhancedQueryPageProps<Queries.LifecycleInnerPageQuery>;

const LifecycleInnerPage: React.FC<LifecycleInnerPageProps> = ({
  data,
  children,
  pageContext,
}: LifecycleInnerPageProps) => {
  if (data.currentPage.frontmatter && data.siblings && data.currentPage.tableOfContents) {
    return (
      <PageLayoutNav
        frontmatter={data.currentPage.frontmatter}
        siblings={data.siblings}
        tableOfContents={data.currentPage.tableOfContents}
        pageContext={pageContext}
        useNextLink={true}
      >
        <MDXContent>{children}</MDXContent>
      </PageLayoutNav>
    );
  }
  return (
    <SiteLayout pagePath={pageContext.pagePath}>
      <h1>Something went wrong</h1>
    </SiteLayout>
  );
};

export default LifecycleInnerPage;

export const Head: HeadFC<Queries.LifecycleInnerPageQuery> = ({ data }: { data: Queries.LifecycleInnerPageQuery }) => (
  <SEO frontmatter={data.currentPage?.frontmatter}></SEO>
);

export const query = graphql`
  query LifecycleInnerPage($id: String, $parentPathRegex: String) {
    currentPage: mdx(id: { eq: $id }) {
      ...currentPageWithLocalNav
    }
    siblings: allMdx(
      filter: { internal: { contentFilePath: { regex: $parentPathRegex } } }
      sort: { frontmatter: { nav_weight: ASC } }
    ) {
      nodes {
        ...minimalFrontmatter
        parent {
          ... on File {
            name
            relativePath
            relativeDirectory
          }
        }
      }
    }
  }
`;
