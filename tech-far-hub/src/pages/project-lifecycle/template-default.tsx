import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { graphql } from "gatsby";
import Layout from "../../components/layout";
import { IPageContext } from "../../types";
import { Grid, SideNav } from "@trussworks/react-uswds";

type LifecycleInnerPageProps = PageProps<Queries.LifecycleInnerPageQuery, IPageContext>;

interface ITOCItem {
  url: string;
  title: string;
}

const LifecycleInnerPage: React.FC<LifecycleInnerPageProps> = ({
  data,
  children,
  pageContext,
}: LifecycleInnerPageProps) => {
  const tocLinks = data.mdx?.tableOfContents?.items.map((item: ITOCItem) => {
    return <a href={item.url}>{item.title}</a>;
  });
  return (
    <Layout breadCrumbs={pageContext.breadCrumbs}>
      <h2>{data.mdx?.frontmatter?.heading}</h2>
      <hr className="text-accent-warm " />
      <Grid row gap={2}>
        <Grid tablet={{ col: 2 }}>
          <SideNav items={tocLinks}></SideNav>
        </Grid>
        <Grid tablet={{ col: 8 }}>{children}</Grid>
        <Grid tablet={{ col: 2 }}>Reference stuff</Grid>
      </Grid>
    </Layout>
  );
};

export default LifecycleInnerPage;

export const Head: HeadFC = () => <title>TechFAR Hub</title>;

export const query = graphql`
  query LifecycleInnerPage($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        heading
      }
      tableOfContents(maxDepth: 3)
    }
  }
`;
