import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { graphql } from "gatsby";
import Layout from "../../components/layout";

const CaseStudyPage: React.FC<PageProps<Queries.CaseStudyPageQuery>> = ({
  data,
  children,
}: PageProps<Queries.CaseStudyPageQuery>) => {
  return (
    <Layout>
      <h2>{data.mdx?.frontmatter?.heading}</h2>
      {children}
    </Layout>
  );
};

export default CaseStudyPage;

export const Head: HeadFC = () => <title>TechFAR Hub</title>;

export const query = graphql`
  query CaseStudyPage($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        heading
      }
    }
  }
`;
