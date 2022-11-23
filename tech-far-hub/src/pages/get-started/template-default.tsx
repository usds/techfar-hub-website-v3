import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { graphql } from "gatsby";
import Layout from "../../components/layout";
import { IPageContext } from "../../types";

const LifecyclePage: React.FC<PageProps<Queries.GetStartedInnerPageQuery>> = ({
  data,
  children,
  pageContext,
}: PageProps<Queries.GetStartedInnerPageQuery>) => {
  return (
    <Layout breadCrumbs={pageContext.breadCrumbs}>
      <h2>{data.mdx?.frontmatter?.heading}</h2>
      {children}
    </Layout>
  );
};

export default LifecyclePage;

export const Head: HeadFC = () => <title>TechFAR Hub</title>;

export const query = graphql`
  query GetStartedInnerPage($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        heading
      }
    }
  }
`;
