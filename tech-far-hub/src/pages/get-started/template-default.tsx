import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { graphql } from "gatsby";
import Layout from "../../components/layout";
import { IPageContext } from "../../types";

type LifecyclePageProps = PageProps<Queries.GetStartedInnerPageQuery, IPageContext>;

const LifecyclePage: React.FC<LifecyclePageProps> = ({ data, children, pageContext }: LifecyclePageProps) => {
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
