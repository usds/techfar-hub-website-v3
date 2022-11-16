import * as React from "react"

import { GridContainer, Grid, FooterNav, SocialLink, SocialLinks } from '@trussworks/react-uswds'

const Footer = () => {
    const socialLinks = [
        <SocialLink key="facebook" name="Facebook" href="#" />,
        <SocialLink key="twitter" name="Twitter" href="#" />,
        <SocialLink key="youtube" name="YouTube" href="#" />,
        <SocialLink key="instagram" name="Instagram" href="#" />,
    ]
    return (
        <footer className="usa-footer usa-footer--big">
            <GridContainer className="usa-footer__return-to-top">
                <a href="#">Return to top</a>
            </GridContainer>
            <GridContainer>
                <Grid row gap={4}>
                    <Grid tablet={{ col: 12 }}>
                        <Grid row gap={2}>
                            <Grid tablet={{ col: 2 }}>
                                <Grid row>
                                    <img src="/images/usds-logo-footer.svg" alt="United States Digital Service" />
                                </Grid>
                                <Grid row>
                                    U.S. Digital Service
                                </Grid>
                            </Grid>
                            <Grid tablet={{ col: 2 }}>
                                <FooterNav
                                    aria-label="Footer navigation"
                                    size="big"
                                    links={[
                                        <a href="#">Nav link 1.1</a>,
                                        <a href="#">Nav link 1.1</a>

                                    ]}
                                />
                            </Grid>
                            <Grid tablet={{ col: 2 }}>
                                <FooterNav
                                    aria-label="Footer navigation"
                                    size="big"
                                    links={[
                                        <a href="#">Nav link 2.1</a>,
                                        <a href="#">Nav link 2.1</a>

                                    ]}
                                />

                            </Grid>
                            <Grid tablet={{ col: 2 }}>
                                <FooterNav
                                    aria-label="Footer navigation"
                                    size="big"
                                    links={[
                                        <a href="#">Nav link 3.1</a>,
                                        <a href="#">Nav link 3.1</a>

                                    ]}
                                />

                            </Grid>
                            <Grid tablet={{ col: 3 }}>
                                 <SocialLinks links={socialLinks} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </GridContainer>
        </footer>
    )
}

export default Footer;