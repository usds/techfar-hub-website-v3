import SiteLayout from "../components/site-layout";
import MDXContent from "../components/mdxcontent";
import { IPageContext } from "../types";
import * as React from "react";
import { graphql, HeadFC, PageProps } from "gatsby";
import { CardGroup, Grid } from "@trussworks/react-uswds";
import ResourceCard from "../components/resouces-card";
import { SEO } from "../components/seo";

type ResoucesPageProps = PageProps<Queries.ResourcesLandingContextQuery, IPageContext>;
const ResoucesLandingPage: React.FC<ResoucesPageProps> = ({ data, children, pageContext }: ResoucesPageProps) => {
  const pageHeading = data.currentPage?.frontmatter?.heading ?? "Resources";
  return (
    <SiteLayout breadCrumbs={pageContext.breadCrumbs} className="tfh-resources-landing" pagePath={pageContext.pagePath}>
      <h1>{pageHeading}</h1>
      <Grid row>
        <MDXContent>{children}</MDXContent>
      </Grid>
      <Grid row>
        <CardGroup>
          {data.resourceLandPagePromos.edges.map(({ node }) => {
            return <ResourceCard node={node} width={6} key={node.id}></ResourceCard>;
          })}
        </CardGroup>
      </Grid>
    </SiteLayout>
  );
};

export default ResoucesLandingPage;

export const Head: HeadFC<Queries.ResourcesLandingContextQuery> = ({
  data,
}: {
  data: Queries.ResourcesLandingContextQuery;
}) => <SEO frontmatter={data.currentPage?.frontmatter}></SEO>;

export const query = graphql`
  query ResourcesLandingContext($id: String) {
    currentPage: mdx(id: { eq: $id }) {
      ...minimalFrontmatter
    }
    resourceLandPagePromos: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/.*/components/resources-home/.*/" }
        frontmatter: { visible: { eq: true } }
      }
      sort: { frontmatter: { nav_weight: ASC } }
    ) {
      edges {
        node {
          id
          html
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
            heading
            href
          }
        }
      }
    }
  }
`;
