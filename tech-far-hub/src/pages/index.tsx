import * as React from "react";
import { graphql, HeadFC, PageProps, Link } from "gatsby";
import Layout from "../components/layout";
import { Grid } from "@trussworks/react-uswds";
import { Initiative } from "../components/initiative";

const IndexPage: React.FC<PageProps<Queries.HomePageInitiativesQuery>> = ({ data }) => {
  const initiatives = data.allMdx.nodes.map((node) => {
    if (
      node.frontmatter &&
      node.frontmatter.description &&
      node.frontmatter.heading &&
      node.frontmatter.slug &&
      node.parent &&
      "relativeDirectory" in node.parent
    ) {
      const pagePath = `/${node.parent.relativeDirectory}/${node.frontmatter.slug}`;
      return (
        <Initiative heading={node.frontmatter.heading} destination={pagePath}>
          {node.frontmatter.description}
        </Initiative>
      );
    }
  });
  return (
    <Layout>
      <Grid row gap={6} className="border-bottom padding-bottom-205 padding-top-205">
        <Grid tablet={{ col: 8 }} className="tfh-hp-highlight border-right">
          <h2 className="tfh-hp-highlight-h2 font-heading-xl">Case Study Highlight: Navigating User Research</h2>
          <p className="tfh-hp-highlight-desc">
            Review a contracting method from acquisition planning to post-award phase that uses the agile method{" "}
            <em>and</em> stays true tho the FAR.
          </p>
          <img src="https://placekitten.com/800/400" alt="A cat" />
        </Grid>
        <Grid tablet={{ col: 4 }} className="tfh-hp-right-nav">
          <hr className="text-accent-warm bg-accent-warm" />
          <h3>01. Get Started</h3>
          <ol>
            <li>
              <a href="#">What is the TechFAR Hub?</a>
            </li>
            <li>
              <a href="#">How to Use the TFH</a>
            </li>
            <li>
              <a href="#">How to Get Involved</a>
            </li>
          </ol>
          <hr className="text-accent-cool-dark bg-accent-cool-dark" />
          <h3>02. TFH Lifecycle</h3>
          <p>See how the TechFAR Hub takes an agile approach to digital acquisition.</p>
          <ol>
            <li>
              <Link to="/pre-solicitation">Pre-Solicitation</Link>
            </li>
            <li>
              <Link to="/solicitation">Solicitation</Link>
            </li>
            <li>
              <Link to="/evalutation">Evaluation</Link>
            </li>
            <li>
              <Link to="/contract-administration">Contract Administration</Link>
            </li>
          </ol>
          <hr className="text-green bg-green " />
          <h3>03. Resources</h3>
          <p>View first-hand experiences of fellows acquisition professionals, get tools, access training, and more</p>
        </Grid>
      </Grid>
      <Grid row>
        <Grid col="fill" className="tfh-hp-initiatives">
          <h2>Initiatives</h2>
          {initiatives}
        </Grid>
      </Grid>
    </Layout>
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
