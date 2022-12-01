import * as React from "react";
import type { HeadFC } from "gatsby";
import { graphql, Link, PageProps } from "gatsby";
import { CardGroup, Card, CardHeader, CardBody, CardFooter, Button } from "@trussworks/react-uswds";
import Layout from "../../components/layout";

const GetStartedPage: React.FC<PageProps<Queries.GetStartedPageQuery>> = ({
  data,
  children,
  pageContext,
}: PageProps<Queries.GetStartedPageQuery>) => {
  return (
    <Layout breadCrumbs={pageContext.breadCrumbs}>
      <h2>{data.getStarted?.frontmatter?.heading}</h2>
      <hr className="text-accent-warm " />
      {children}
      <p className="usa-updated">Updated: {data.getStarted?.frontmatter?.updated}</p>
      <CardGroup>
        {data.lifecycle.nodes.map((node) => (
          <Card headerFirst gridLayout={{ tablet: { col: 3 } }} key={node.frontmatter?.slug}>
            <CardHeader className="bg-base-lightest">
              <h3 className="usa-card__heading">
                {node.frontmatter?.lifecycle_stage} {node.frontmatter?.heading}
              </h3>
            </CardHeader>
            <CardBody>
              <p>{node.frontmatter?.description}</p>
            </CardBody>
            <CardFooter>
              {node.frontmatter?.slug && (
                <Link className="float-right font-sans-lg " to={node.frontmatter?.slug}>
                  Go &gt;
                </Link>
              )}
            </CardFooter>
          </Card>
        ))}
      </CardGroup>
    </Layout>
  );
};

export default GetStartedPage;

export const Head: HeadFC = () => <title>TechFAR Hub: Get Started</title>;

export const query = graphql`
  query GetStartedPage($id: String) {
    lifecycle: allMdx(
      filter: { internal: { contentFilePath: { regex: "/.*get-started/(?!index.mdx)/" } } }
      sort: { frontmatter: { lifecycle_stage: ASC } }
    ) {
      nodes {
        frontmatter {
          slug
          heading
          lifecycle_stage
          updated(formatString: "MM/D/YYYY")
          description
        }
      }
    }
    getStarted: mdx(id: { eq: $id }) {
      frontmatter {
        slug
        heading
        seo_title
        updated(formatString: "MM/D/YYYY")
        tags
      }
      id
      body
    }
  }
`;
