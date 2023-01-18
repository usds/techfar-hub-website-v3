import * as React from "react";
import type { HeadFC } from "gatsby";
import { graphql, Link } from "gatsby";
import SiteLayout from "../components/site-layout";
import MDXContent from "../components/mdxcontent";
import { TOCEnhancedQueryPageProps } from "../types";
import PageLayoutNav from "../components/page-layout-nav";
import { Card, CardBody, CardFooter, CardGroup, CardHeader, Grid } from "@trussworks/react-uswds";
import { SEO } from "../components/seo";
import { Hyperlink } from "../components/hyperlink";
import remark from "remark";
import remarkHtml from "remark-html";
import _ from "lodash";

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
          <CardGroup className="tfh-listing-cards">
            {data.children.nodes.map(({ frontmatter, parent }) => {
              if (
                frontmatter &&
                frontmatter.heading &&
                frontmatter.promo_description &&
                frontmatter.slug &&
                parent &&
                "relativeDirectory" in parent &&
                parent.relativeDirectory
              ) {
                const description = remark().use(remarkHtml).processSync(frontmatter.promo_description).toString();

                return (
                  <Card key={`card-${_.snakeCase(frontmatter.heading)}`}>
                    <CardHeader>
                      <h2>{frontmatter.heading}</h2>
                    </CardHeader>
                    <CardBody>
                      <div dangerouslySetInnerHTML={{ __html: description }}></div>
                    </CardBody>
                    <CardFooter>
                      {!frontmatter.link && (
                        <Link to={`/${parent.relativeDirectory}/${frontmatter.slug}`} className="usa-button">
                          Read More
                        </Link>
                      )}
                      {frontmatter.link && (
                        <Hyperlink href={frontmatter.link} className="usa-button">
                          Read More
                        </Hyperlink>
                      )}
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
    <SiteLayout pagePath={pageContext.pagePath}>
      <h1>Something went wrong</h1>
    </SiteLayout>
  );
};

export default DefaultPageTemplate;

export const Head: HeadFC<Queries.ListPageContentQuery> = ({ data }: { data: Queries.ListPageContentQuery }) => (
  <SEO frontmatter={data.currentPage?.frontmatter}></SEO>
);

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
          link
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
          link
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
  }
`;
