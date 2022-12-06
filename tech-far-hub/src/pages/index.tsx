import * as React from "react";
import { HeadFC, Link, PageProps } from "gatsby";
import Layout from "../components/layout";
import { Grid } from "@trussworks/react-uswds";
import { Initiative } from "../components/initiative";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Grid row gap={6} className="border-bottom padding-bottom-205 padding-top-205">
        <Grid tablet={{ col: 8 }} className="tfh-hp-highlight border-right">
          <h2 className="tfh-hp-highlight-h2 font-heading-xl">
            <Link to="/resouces/case-studies/va-user-research">
              Case Study: VA.Gov Modernization Comparative Analysis
            </Link>
          </h2>
          <p className="tfh-hp-highlight-desc">
            THe VA technology Acquisition Cent, in support of VA OIT/DSVA, utilized FAR 13.1 Simplified Acquisition
            Procedures, which enabled the team to streamline a multi-step evaluation with onsite demonstrations, and
            documented the evaluation using a comparative analysis.
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
          <hr className="text-green bg-green " />
          <h3>03. Resources</h3>
          <p>View first-hand experiences of fellows acquisition professionals, get tools, access training, and more</p>
          <ol>
            <li>
              <Link to="/resources/tools/agile-estimator">Agile Estimator</Link>
            </li>
            <li>
              <Link to="/resources/tools/sources-sought">Sources Sought Tool</Link>
            </li>
          </ol>
        </Grid>
      </Grid>
      <Grid row>
        <Grid col="fill" className="tfh-hp-initiatives">
          <h2>Initiatives</h2>
          <Initiative
            heading="8(a) Digital Service Initiative"
            destination="8a"
            media="https://placekitten.com/600/400"
          >
            The U.S. Digital Service and Small Business Administration have partnered to help agencies buy digital
            services using this low-risk gateway.
          </Initiative>
          <Initiative
            heading="Acquisiton Innovation Advocates (AIA) Council"
            destination="aia"
            media="https://placekitten.com/600/400"
          >
            The U.S. Digital Service and Small Business Administration have partnered to help agencies buy digital
            services using this low-risk gateway.
          </Initiative>
          <Initiative
            heading="Digital IT Acquisition Professional Training (DITAP)"
            destination="ditap"
            media="https://placekitten.com/600/400"
          >
            The U.S. Digital Service and Small Business Administration have partnered to help agencies buy digital
            services using this low-risk gateway.
          </Initiative>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>TechFAR Hub</title>;
