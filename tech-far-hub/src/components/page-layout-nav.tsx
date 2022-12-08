import { Grid, SideNav } from "@trussworks/react-uswds";
import { graphql, Link } from "gatsby";
import * as React from "react";
import { Alert } from "../components/alert";
import SiteLayout from "../components/site-layout";
import { IPageContext } from "../types";
import Resources from "../components/resources";
import { IMinimalFrontmatter, ITOCItem } from "../types";

interface IPageLayoutNav {
  frontmatter: IMinimalFrontmatter;
  siblings: {
    readonly nodes: readonly {
      readonly frontmatter: IMinimalFrontmatter | null;
    }[];
  };
  tableOfContents: Record<string, ITOCItem[]>;
  pageContext: IPageContext;
  useNextLink: boolean;
  children: React.ReactNode;
}

const PageLayoutNav: React.FC<IPageLayoutNav> = ({
  frontmatter,
  siblings,
  tableOfContents,
  pageContext,
  children,
  useNextLink = false,
}: IPageLayoutNav) => {
  const currentSlug = frontmatter?.slug;
  const tocLinks = tableOfContents.items.map((item: ITOCItem) => {
    return (
      <a href={item.url} key={item.url} className="font-ui-3xs">
        {item.title}
      </a>
    );
  });
  let atCurrent = false;
  let nextLink: IMinimalFrontmatter | null = null;
  const siblingLinks = siblings.nodes.map(({ frontmatter }) => {
    if (frontmatter && frontmatter.slug && frontmatter.heading) {
      if (frontmatter.slug === currentSlug && frontmatter.slug !== "index") {
        atCurrent = true;
        return (
          <>
            <a href="#" className="usa-current" key="current">
              {frontmatter.heading}
            </a>
            <SideNav items={tocLinks}></SideNav>
          </>
        );
      } else if (frontmatter.slug !== "index") {
        if (atCurrent) {
          nextLink = frontmatter as IMinimalFrontmatter;
          atCurrent = false;
        }
        return <Link to={`${pageContext.parentPath}/${frontmatter.slug}`}>{frontmatter.heading}</Link>;
      }
    }
  });

  const components = { Alert };
  return (
    <SiteLayout breadCrumbs={pageContext.breadCrumbs}>
      <h1>{frontmatter?.heading}</h1>
      <hr className="text-accent-warm " />
      <Grid row gap={2} className="margin-bottom-4">
        <Grid tablet={{ col: 2 }}>
          <div className="position-sticky top-0">
            <SideNav items={siblingLinks}></SideNav>
          </div>
        </Grid>
        <Grid tablet={{ col: 10 }}>
          {children}
          {useNextLink && nextLink !== null && (
            <span className="tfh-next-link">
              <Link to={`${pageContext.parentPath}/${nextLink.slug}`}>
                <strong>Next: {nextLink.heading}</strong>
              </Link>
            </span>
          )}
        </Grid>
      </Grid>
      <Grid row className="tfh-resources-bar">
        <Grid col="fill">
          <hr />
          <h3 className="font-ui-xl">Resources</h3>
          <Resources></Resources>
        </Grid>
      </Grid>
    </SiteLayout>
  );
};

export const query = graphql`
  fragment minimalFrontmatter on Mdx {
    frontmatter {
      slug
      heading
    }
  }
  fragment currentPageWithLocalNav on Mdx {
    ...minimalFrontmatter
    tableOfContents(maxDepth: 2)
  }
`;

export default PageLayoutNav;
