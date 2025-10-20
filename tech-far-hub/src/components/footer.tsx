import * as React from "react";
import { withPrefix } from "gatsby";
import { Hyperlink } from "./hyperlink";
import { GridContainer, Grid, FooterNav, SocialLink, SocialLinks } from "@trussworks/react-uswds";
import YAMLData from "../../content/global-nav.yaml";

import { INavigationConfiguration } from "../types";
const Footer = () => {
  const navYAML = YAMLData as INavigationConfiguration;
  const footerNav = navYAML.footerNavigation;
  const socialLinks = [
    <SocialLink key="facebook" name="Facebook" href={footerNav.facebookLink} />,
    <SocialLink key="twitter" name="Twitter" href={footerNav.twitterLink} />,
    <SocialLink key="instagram" name="Instagram" href={footerNav.instagramLink} />,
  ];
  const colLinks = [footerNav.column1, footerNav.column2, footerNav.column3].map((column) => {
    return column.map((linkData) => {
      return <Hyperlink href={linkData.link}>{linkData.heading}</Hyperlink>;
    });
  });
  return (
    <footer className="usa-footer usa-footer--big">
      <GridContainer className="usa-footer__return-to-top">
        <a href="#">Return to top</a>
      </GridContainer>
      <GridContainer>
        <Grid row>
          <Grid tablet={{ col: 12 }}>
            <Grid row gap={6}>
              <Grid tablet={{ col: 3 }} className="footer-logo">
                <Grid row>
                  <img src={withPrefix("/images/usds-logo-footer_no-text.svg")} alt="United States DOGE Service" />
                </Grid>
                <Grid row>U.S. DOGE Service</Grid>
              </Grid>
              <Grid tablet={{ col: 2 }}>
                <FooterNav aria-label="Footer navigation" size="big" links={colLinks[0]} />
              </Grid>
              <Grid tablet={{ col: 2 }}>
                <FooterNav aria-label="Footer navigation" size="big" links={colLinks[1]} />
              </Grid>
              <Grid tablet={{ col: 3 }}>
                <FooterNav aria-label="Footer navigation" size="big" links={colLinks[2]} />
              </Grid>
              <Grid tablet={{ col: 2 }}>
                <Grid row className="usa-footer__social-heading">
                  <strong>Follow USDS</strong>
                </Grid>
                <Grid row>
                  <SocialLinks links={socialLinks} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </GridContainer>
    </footer>
  );
};

export default Footer;
