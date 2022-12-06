import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { CardGroup, Card, CardHeader, CardBody, CardFooter } from "@trussworks/react-uswds";
import MDXContent from "./mdxcontent";

const Resources = () => {
  const data: Queries.ResourcePromosQuery = useStaticQuery(graphql`
    query ResourcePromos {
      allMdx(
        filter: {
          internal: { contentFilePath: { regex: "/.*/components/.*/" } }
          frontmatter: { visible: { eq: true } }
        }
        sort: { frontmatter: { nav_weight: ASC } }
      ) {
        edges {
          node {
            id
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
            internal {
              contentFilePath
            }
            body
          }
        }
      }
    }
  `);
  return (
    <CardGroup>
      {data.allMdx.edges.map(({ node }) => {
        return (
          <Card headerFirst gridLayout={{ tablet: { col: 3 } }}>
            <CardHeader>
              <h4>{node.frontmatter?.heading}</h4>
            </CardHeader>
            <CardBody>{node.body}</CardBody>
            <CardFooter>
              <Link to={node.frontmatter?.href} className="usa-button">
                Go
              </Link>
            </CardFooter>
          </Card>
        );
      })}
    </CardGroup>
  );
};

export default Resources;
