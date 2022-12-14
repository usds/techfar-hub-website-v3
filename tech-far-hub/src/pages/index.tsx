import * as React from "react";
import { HeadFC, Link, PageProps, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import SiteLayout from "../components/site-layout";
import { Grid } from "@trussworks/react-uswds";
import { Initiative } from "../components/initiative";

const IndexPage: React.FC<PageProps<Queries.HomePageInitiativesQuery>> = ({
  data,
}: {
  data: Queries.HomePageInitiativesQuery;
  children: undefined;
}) => {
  const initiatives = data.allMdx.nodes.map((node) => {
    if (
      node.frontmatter &&
      node.frontmatter.description &&
      node.frontmatter.heading &&
      node.frontmatter.slug &&
      node.frontmatter.media_image &&
      node.frontmatter.media_alt &&
      node.parent &&
      "relativeDirectory" in node.parent
    ) {
      const pagePath = `/${node.parent.relativeDirectory}/${node.frontmatter.slug}`;
      return (
        <Initiative heading={node.frontmatter.heading} destination={pagePath} media={node.frontmatter.media_image}>
          {node.frontmatter.description}
        </Initiative>
      );
    }
  });
  return (
    <SiteLayout className="tfh-home">
      <Grid row gap={6} className="tfh-hp-top">
        <Grid tablet={{ col: 8 }} className="tfh-hp-highlight">
          <h2 className="tfh-hp-highlight-h2 font-heading-xl">
            <Link to="/resouces/case-studies/va-user-research">
              Case Study: VA.Gov Modernization Comparative Analysis
            </Link>
          </h2>
          <p className="tfh-hp-highlight-desc">
            The VA technology Acquisition Cent, in support of VA OIT/DSVA, utilized FAR 13.1 Simplified Acquisition
            Procedures, which enabled the team to streamline a multi-step evaluation with onsite demonstrations, and
            documented the evaluation using a comparative analysis.
          </p>
          <StaticImage
            src="../../static/assets/img/ux-indonesia-8mikJ83LmSQ-unsplash.jpg"
            width={623}
            alt="Two people collaborating over graphs"
          />
        </Grid>
        <Grid tablet={{ col: 4 }} className="tfh-hp-right-nav">
          <hr className="bg-primary-dark" />
          <h3>01. Get Started</h3>
          <ol>
            <li>
              <a href="/get-started/">What is the TechFAR Hub?</a>
            </li>
            <li>
              <a href="/get-started/how-to-use/">How to Use the TFH</a>
            </li>
            <li>
              <a href="https://github.com/usds/techfar-hub-website-v3">How to Get Involved</a>
            </li>
          </ol>
          <hr className="bg-primary-dark" />
          <h3>02. TFH Lifecycle</h3>
          <p>See how the TechFAR Hub takes an agile approach to digital acquisition.</p>
          <ol>
            <li>
              <Link to="/pre-solicitation/">Pre-Solicitation</Link>
            </li>
            <li>
              <Link to="/solicitation/">Solicitation</Link>
            </li>
            <li>
              <Link to="/evaluation/">Evaluation</Link>
            </li>
            <li>
              <Link to="/contract-administration/">Contract Administration</Link>
            </li>
          </ol>
          <hr className="bg-primary-dark" />
          <h3>03. Resources</h3>
          <p>View first-hand experiences of fellows acquisition professionals, get tools, access training, and more</p>
          <ol>
            <li>
              <Link to="/resources/templates-samples/agile-team-estimator/">Agile Estimator</Link>
            </li>
            <li>
              <Link to="/resources/templates-samples/sources-sought-tool">Sources Sought Tool</Link>
            </li>
          </ol>
        </Grid>
      </Grid>
      <Grid row>
        <Grid col="fill" className="tfh-hp-initiatives">
          <h2>Initiatives</h2>
          {initiatives}
        </Grid>
      </Grid>
    </SiteLayout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>TechFAR Hub</title>;

export const query = graphql`
  query HomePageInitiatives {
    allMdx(filter: { frontmatter: { page_type: { eq: "initiative" } } }, sort: { frontmatter: { nav_weight: ASC } }) {
      nodes {
        id
        frontmatter {
          slug
          description
          heading
          media_alt
          media_image
        }
        internal {
          contentDigest
        }
        parent {
          ... on File {
            id
            name
            relativeDirectory
          }
        }
      }
    }
  }
`;
