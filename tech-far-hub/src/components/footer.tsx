import * as React from "react";
import { Link, withPrefix } from "gatsby";

import { GridContainer, Grid, FooterNav, SocialLink, SocialLinks } from "@trussworks/react-uswds";

const Footer = () => {
  const socialLinks = [
    <SocialLink key="facebook" name="Facebook" href="https://www.facebook.com/unitedstatesdigitalservice" />,
    <SocialLink key="twitter" name="Twitter" href="https://twitter.com/USDS" />,
    <SocialLink key="instagram" name="Instagram" href="https://www.instagram.com/usdigitalservice" />,
  ];
  return (
    <footer className="usa-footer usa-footer--big">
      <GridContainer className="usa-footer__return-to-top">
        <a href="#">Return to top</a>
      </GridContainer>
      <GridContainer>
        <Grid row>
          <Grid tablet={{ col: 12 }}>
            <Grid row gap={6}>
              <Grid tablet={{ col: 3 }}>
                <Grid row>
                  <img src={withPrefix("/images/usds-logo-footer.svg")} alt="United States Digital Service" />
                </Grid>
                <Grid row>U.S. Digital Service</Grid>
              </Grid>
              <Grid tablet={{ col: 2 }}>
                <FooterNav
                  aria-label="Footer navigation"
                  size="big"
                  links={[
                    <Link to="/get-started/">Get Started</Link>,
                    <Link to="/pre-solicitation/">Pre-Solicitation</Link>,
                    <Link to="/solicitation/">Solicitation</Link>,
                    <Link to="/evaluation/">Evaluation</Link>,
                    <Link to="/contract-administration/">Contract Administration</Link>,
                  ]}
                />
              </Grid>
              <Grid tablet={{ col: 2 }}>
                <FooterNav
                  aria-label="Footer navigation"
                  size="big"
                  links={[
                    <Link to="/resources/learning-center/">Learning Center</Link>,
                    <Link to="/resources/case-studies/">Case Studies</Link>,
                    <Link to="/resources/templates/">Templates</Link>,
                    <Link to="/resources/vehicles/">Vehicles &amp; Policy</Link>,
                    <Link to="/resources/vehicles/">Contracts &amp; Vehicles</Link>,
                  ]}
                />
              </Grid>
              <Grid tablet={{ col: 3 }}>
                <FooterNav
                  aria-label="Footer navigation"
                  size="big"
                  links={[
                    <a href="https://www.acquisition.gov/">Acquisition.gov</a>,
                    <a href="https://www.fai.gov/periodic-table">FAR Periodic Table</a>,
                    <a href="https://www.usds.gov/apply">Apply to USDS</a>,
                    <Link to="/resources/history/">History of TFH</Link>,
                    <a href="https://github.com/usds/techfar-hub-website-v3">Contribute to this site</a>,
                  ]}
                />
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
