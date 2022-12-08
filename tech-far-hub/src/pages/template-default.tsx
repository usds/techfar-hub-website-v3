import { Grid, SideNav } from "@trussworks/react-uswds";
import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { graphql, Link } from "gatsby";
import SiteLayout from "../components/site-layout";
import { DeepPick } from "ts-deep-pick";
import MDXContent from "../components/mdxcontent";
import Resources from "../components/resources";
import { Alert } from "../components/alert";
import { IPageContext } from "../types";
import { TOCEnhancedQueryPageProps } from "../types";
import PageLayoutNav from "../components/page-layout-nav";

type DefaultPageProps = TOCEnhancedQueryPageProps<Queries.PageContentQuery>;

const DefaultPageTemplate: React.FC<DefaultPageProps> = ({ data, children, pageContext }: DefaultPageProps) => {
  if (data.currentPage.frontmatter && data.siblings && data.currentPage.tableOfContents) {
    return (
      <PageLayoutNav
        frontmatter={data.currentPage.frontmatter}
        siblings={data.siblings}
        tableOfContents={data.currentPage.tableOfContents}
        pageContext={pageContext}
        useNextLink={false}
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

export default DefaultPageTemplate;

export const Head: HeadFC = () => <title>TechFAR Hub</title>;

export const query = graphql`
  query PageContent($id: String, $parentPathRegex: String) {
    currentPage: mdx(id: { eq: $id }) {
      ...currentPageWithLocalNav
    }
    siblings: allMdx(
      filter: { internal: { contentFilePath: { regex: $parentPathRegex } } }
      sort: { frontmatter: { nav_weight: ASC } }
    ) {
      nodes {
        ...minimalFrontmatter
      }
    }
  }
`;
