import * as React from "react";
import type { HeadFC } from "gatsby";
import { graphql } from "gatsby";
import SiteLayout from "../components/site-layout";
import type { PageProps } from "gatsby";
import { Card, CardBody, CardFooter, CardHeader } from "@trussworks/react-uswds";
import { Hyperlink } from "../components/hyperlink";

interface ITagPageContext {
  tag: string;
  pagePath: string;
}

const TagPageTemplate: React.FC<PageProps<Queries.TagPageQueryQuery, ITagPageContext>> = ({
  data,
  pageContext,
}: PageProps<Queries.TagPageQueryQuery, ITagPageContext>) => {
  const relatedPages = data.pages.nodes.map((node) => {
    let href: string;
    if (node.frontmatter && node.parent) {
      if (node.frontmatter.link) {
        href = node.frontmatter.link;
      } else {
        const slug = node.frontmatter.slug === "index" ? "" : node.frontmatter.slug;
        let path = "relativeDirectory" in node.parent ? node.parent.relativeDirectory : "";
        href = `/${path}/${slug}/`;
      }
      return (
        <Card>
          <CardHeader>
            <h2>
              <Hyperlink href={href}>{node.frontmatter?.heading}</Hyperlink>
            </h2>
          </CardHeader>
          <CardBody>{node.frontmatter?.promo_description}</CardBody>
          <CardFooter>
            <Hyperlink href={href} className="usa-button">
              Read More
            </Hyperlink>
          </CardFooter>
        </Card>
      );
    }
  });
  return (
    <SiteLayout pagePath={pageContext.pagePath}>
      <>
        <h1>Tagged: {pageContext.tag}</h1>
        {relatedPages}
      </>
    </SiteLayout>
  );
};

export default TagPageTemplate;
export const query = graphql`
  query TagPageQuery($tag: String) {
    pages: allMdx(filter: { frontmatter: { tags: { eq: $tag } } }) {
      nodes {
        frontmatter {
          slug
          heading
          promo_description
          link
        }
        id
        parent {
          ... on File {
            id
            name
            relativeDirectory
            relativePath
          }
        }
      }
    }
  }
`;

export const Head: HeadFC<Queries.TagPageQueryQuery, ITagPageContext> = ({
  pageContext,
}: {
  pageContext: ITagPageContext;
}) => {
  return (
    <>
      <title>Pages Tagged: {pageContext.tag} | TechFAR Hub | USDS.gov</title>
      <meta name="title" content={`Tagged: ${pageContext.tag} | TechFAR Hub | USDS.gov`} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    </>
  );
};
