import { Grid, SideNav } from "@trussworks/react-uswds";
import type { HeadFC, PageProps } from "gatsby";
import { graphql, Link } from "gatsby";
import * as React from "react";
import Layout from "../../components/layout";
import { IPageContext } from "../../types";
import { DeepPick } from "ts-deep-pick";

type TableOfContents = { currentPage: { tableOfContents: Record<string, ITOCItem[]> } };
type LifecycleCurrentPage = DeepPick<Queries.LifecycleInnerPageQuery, "currentPage.!tableOfContents"> & TableOfContents;

type LifecycleInnerPageQuery = Omit<Queries.LifecycleInnerPageQuery, "currentPage"> & LifecycleCurrentPage;

type LifecycleInnerPageProps = PageProps<LifecycleInnerPageQuery, IPageContext>;

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
      <a href={item.url} key={item.url}>
        {item.title}
      </a>
    );
  });
  const siblingLinks = data.siblings?.nodes.map(({ frontmatter }) => {
    if (frontmatter && frontmatter.slug && frontmatter.heading) {
      if (frontmatter.slug === currentSlug) {
        return (
          <>
            <a href="#" className="usa-current" key="current">
              {frontmatter.heading}
            </a>
            <SideNav items={tocLinks}></SideNav>
          </>
        );
      } else {
        return <Link to={`../${frontmatter.slug}`}>{frontmatter.heading}</Link>;
      }
    }
  });
  return (
    <Layout breadCrumbs={pageContext.breadCrumbs}>
      <h2>{data.currentPage?.frontmatter?.heading}</h2>
      <hr className="text-accent-warm " />
      <Grid row gap={2}>
        <Grid tablet={{ col: 2 }}>
          <div className="position-sticky top-0">
            <SideNav items={siblingLinks}></SideNav>
          </div>
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
    currentPage: mdx(id: { eq: $id }) {
      frontmatter {
        heading
        slug
      }
      tableOfContents(maxDepth: 3)
    }
    siblings: allMdx(
      filter: { internal: { contentFilePath: { regex: "/.*pre-solicitation/(?!index.mdx)/" } } }
      sort: { frontmatter: { lifecycle_stage: ASC } }
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
