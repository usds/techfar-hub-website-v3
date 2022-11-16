import * as React from "react"

import { GridContainer, Grid, FooterNav } from '@trussworks/react-uswds'

const Footer = () => {
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
            <a href="#">Nav link 1</a>,
            <a href="#">Nav link 1</a>

        ]}
        />
                            </Grid>
                            <Grid tablet={{ col: 2 }}>
                                Three
                            </Grid>
                            <Grid tablet={{ col: 2 }}>
                                Four
                            </Grid>
                            <Grid tablet={{ col: 3 }}>
                                Social
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </GridContainer>
        </footer>
    )
}

export default Footer;