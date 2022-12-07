import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { IPageContext } from "../types";

type DefaultPageProps = PageProps<Queries.PageContentQuery, IPageContext>;

const DefaultPageTemplate: React.FC<DefaultPageProps> = ({ data, children, pageContext }: DefaultPageProps) => {
  return (
    <Layout breadCrumbs={pageContext.breadCrumbs}>
      <h2>{data.mdx?.frontmatter?.heading}</h2>
      {children}
    </Layout>
  );
};

export default DefaultPageTemplate;

export const Head: HeadFC = () => <title>TechFAR Hub</title>;

export const query = graphql`
  query PageContent($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        heading
      }
    }
  }
`;
