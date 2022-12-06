import { Grid, SideNav } from "@trussworks/react-uswds";
import type { HeadFC, PageProps } from "gatsby";
import { graphql, Link } from "gatsby";
import * as React from "react";
import { DeepPick } from "ts-deep-pick";
import { Alert } from "../components/alert";
import Layout from "../components/layout";
import MDXContent from "../components/mdxcontent";
import { IPageContext } from "../types";
import Resources from "../components/resources";

type TableOfContents = { currentPage: { tableOfContents: Record<string, ITOCItem[]> } };
type LifecycleCurrentPage = DeepPick<Queries.LifecycleInnerPageQuery, "currentPage.!tableOfContents"> & TableOfContents;

type LifecycleInnerPageQuery = Omit<Queries.LifecycleInnerPageQuery, "currentPage"> & LifecycleCurrentPage;

type LifecycleInnerPageProps = PageProps<LifecycleInnerPageQuery, IPageContext>;

interface IMinimalFrontmatter {
  heading: string | null;
  slug: string | null;
}

interface ITOCItem {
  url: string;
  title: string;
}

const LifecycleInnerPage: React.FC<LifecycleInnerPageProps> = ({
  data,
  children,
  pageContext,
}: LifecycleInnerPageProps) => {
  const currentSlug = data.currentPage?.frontmatter?.slug;
  const tocLinks = data.currentPage?.tableOfContents?.items.map((item: ITOCItem) => {
    return (
      <a href={item.url} key={item.url} className="font-ui-3xs">
        {item.title}
      </a>
    );
  });
  let atCurrent = false;
  let nextLink: IMinimalFrontmatter | null = null;
  const siblingLinks = data.siblings?.nodes.map(({ frontmatter }) => {
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
          nextLink = frontmatter;
          atCurrent = false;
        }
        return <Link to={`${pageContext.parentPath}/${frontmatter.slug}`}>{frontmatter.heading}</Link>;
      }
    }
  });

  const components = { Alert };
  return (
    <Layout breadCrumbs={pageContext.breadCrumbs}>
      <h1>{data.currentPage?.frontmatter?.heading}</h1>
      <hr className="text-accent-warm " />
      <Grid row gap={2} className="margin-bottom-4">
        <Grid tablet={{ col: 2 }}>
          <div className="position-sticky top-0">
            <SideNav items={siblingLinks}></SideNav>
          </div>
        </Grid>
        <Grid tablet={{ col: 10 }}>
          <MDXContent>{children}</MDXContent>
          {nextLink && (
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
    </Layout>
  );
};

export default LifecycleInnerPage;

export const Head: HeadFC = () => <title>TechFAR Hub</title>;

export const query = graphql`
  query LifecycleInnerPage($id: String, $parentPathRegex: String) {
    currentPage: mdx(id: { eq: $id }) {
      frontmatter {
        heading
        slug
      }
      tableOfContents(maxDepth: 2)
    }
    siblings: allMdx(
      filter: { internal: { contentFilePath: { regex: $parentPathRegex } } }
      sort: { frontmatter: { nav_weight: ASC } }
    ) {
      nodes {
        frontmatter {
          slug
          heading
        }
      }
    }
  }
`;
