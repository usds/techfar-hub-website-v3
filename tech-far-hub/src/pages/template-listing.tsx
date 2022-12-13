import * as React from "react";
import type { HeadFC } from "gatsby";
import { graphql, Link } from "gatsby";
import SiteLayout from "../components/site-layout";
import MDXContent from "../components/mdxcontent";
import { TOCEnhancedQueryPageProps } from "../types";
import PageLayoutNav from "../components/page-layout-nav";
import { Card, CardBody, CardFooter, CardGroup, CardHeader, Grid } from "@trussworks/react-uswds";

type DefaultPageProps = TOCEnhancedQueryPageProps<Queries.ListPageContentQuery>;

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
        <Grid row className="margin-bottom-2">
          <MDXContent>{children}</MDXContent>
        </Grid>
        <Grid row>
          <CardGroup>
            <pre>{JSON.stringify(data.siblings.nodes, undefined, 2)}</pre>
            {data.children.nodes.map(({ frontmatter }) => {
              if (frontmatter && frontmatter.heading && frontmatter.promo_description && frontmatter.slug) {
                return (
                  <Card>
                    <CardHeader>
                      <h2>{frontmatter.heading}</h2>
                    </CardHeader>
                    <CardBody>{frontmatter.promo_description}</CardBody>
                    <CardFooter>
                      <Link to={frontmatter.slug} className="usa-button">
                        Read More
                      </Link>
                    </CardFooter>
                  </Card>
                );
              }
            })}
          </CardGroup>
        </Grid>
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
  query ListPageContent($id: String, $parentPathRegex: String, $childPathRegex: String) {
    currentPage: mdx(id: { eq: $id }) {
      ...currentPageWithLocalNav
    }
    siblings: allMdx(
      filter: { internal: { contentFilePath: { regex: $parentPathRegex } } }
      sort: { frontmatter: { nav_weight: ASC } }
    ) {
      nodes {
        frontmatter {
          slug
          heading
          promo_description
        }
        parent {
          ... on File {
            name
            relativePath
            relativeDirectory
          }
        }
      }
    }
    children: allMdx(
      filter: { internal: { contentFilePath: { regex: $childPathRegex } } }
      sort: { frontmatter: { nav_weight: ASC } }
    ) {
      nodes {
        frontmatter {
          slug
          heading
          promo_description
        }
      }
    }
  }
`;
