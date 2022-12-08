import type { HeadFC, PageProps } from "gatsby";
import { graphql } from "gatsby";
import * as React from "react";
import { DeepPick } from "ts-deep-pick";
import PageLayoutNav from "../components/page-layout-nav";
import MDXContent from "../components/mdxcontent";
import { IPageContext } from "../types";
import { ITOCItem } from "../types";
import SiteLayout from "../components/site-layout";

type TableOfContents = { currentPage: { tableOfContents: Record<string, ITOCItem[]> } };
type LifecycleCurrentPage = DeepPick<Queries.LifecycleInnerPageQuery, "currentPage.!tableOfContents"> & TableOfContents;

type LifecycleInnerPageQuery = Omit<Queries.LifecycleInnerPageQuery, "currentPage"> & LifecycleCurrentPage;

type LifecycleInnerPageProps = PageProps<LifecycleInnerPageQuery, IPageContext>;

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
    <SiteLayout>
      <h1>Something went wrong</h1>
    </SiteLayout>
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
