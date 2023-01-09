import * as React from "react";
import { HeadFC, Link, PageProps, graphql } from "gatsby";
import SiteLayout from "../components/site-layout";
import { Grid } from "@trussworks/react-uswds";
import { Initiative } from "../components/initiative";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const IndexPage: React.FC<PageProps<Queries.HomePagePromosQuery>> = ({
  data,
}: {
  data: Queries.HomePagePromosQuery;
  children: undefined;
}) => {
  const initiatives = data.initiatives.nodes.map((node) => {
    if (
      node.frontmatter &&
      node.frontmatter.link &&
      node.frontmatter.heading &&
      node.frontmatter.media_image &&
      node.html
    ) {
      return (
        <Initiative
          heading={node.frontmatter.heading}
          destination={node.frontmatter.link}
          media={node.frontmatter.media_image}
          media_alt={node.frontmatter.media_alt_text || "An image"}
        >
          <div dangerouslySetInnerHTML={{ __html: node.html }} />
        </Initiative>
      );
    }
  });
  let caseStudyPromo = null;
  console.log("Case Study", JSON.stringify(data.caseStudy));
  if (
    data.caseStudy &&
    data.caseStudy.frontmatter &&
    data.caseStudy.frontmatter.link &&
    data.caseStudy.frontmatter.heading &&
    data.caseStudy.frontmatter.media_alt_text &&
    data.caseStudy.frontmatter.media_image &&
    data.caseStudy.html
  ) {
    const caseStudyImage = getImage(data.caseStudy.frontmatter.media_image.childImageSharp);
    console.log("caseStudyImage", caseStudyImage);
    caseStudyPromo = (
      <>
        <h2 className="tfh-hp-highlight-h2 font-heading-xl">
          <Link to={data.caseStudy.frontmatter.link}>{data.caseStudy.frontmatter.heading}</Link>
        </h2>
        <p className="tfh-hp-highlight-desc" dangerouslySetInnerHTML={{ __html: data.caseStudy?.html }}></p>
        {caseStudyImage && <GatsbyImage image={caseStudyImage} alt={data.caseStudy.frontmatter.media_alt_text} />}
      </>
    );
  }
  return (
    <SiteLayout className="tfh-home" pagePath="/">
      <Grid row gap={6} className="tfh-hp-top">
        <Grid tablet={{ col: 8 }} className="tfh-hp-highlight">
          {caseStudyPromo}
        </Grid>
        <Grid tablet={{ col: 4 }} className="tfh-hp-right-nav">
          {data.rightRail && data.rightRail.html && (
            <div dangerouslySetInnerHTML={{ __html: data.rightRail.html }}></div>
          )}
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

export const Head: HeadFC = () => (
  <>
    <title>The USDS TechFAR Hub | Public Sector Agile Software Development</title>
    <meta name="title" content="The USDS TechFAR Hub | Public Sector Agile Software Development" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  </>
);

export const query = graphql`
  query HomePagePromos {
    initiatives: allMarkdownRemark(
      filter: { frontmatter: { promo_type: { eq: "initiative" } } }
      sort: { frontmatter: { nav_weight: ASC } }
    ) {
      nodes {
        html
        frontmatter {
          heading
          link
          media_image {
            childImageSharp {
              gatsbyImageData(height: 350, width: 400, placeholder: BLURRED)
            }
          }
          media_alt_text
        }
      }
    }
    caseStudy: markdownRemark(frontmatter: { promo_type: { eq: "case-study" } }) {
      html
      frontmatter {
        heading
        link
        media_alt_text
        media_image {
          childImageSharp {
            gatsbyImageData(width: 623, placeholder: BLURRED)
          }
        }
      }
    }
    rightRail: markdownRemark(frontmatter: { promo_type: { eq: "homepage-right-rail" } }) {
      html
      frontmatter {
        heading
        link
      }
    }
  }
`;
