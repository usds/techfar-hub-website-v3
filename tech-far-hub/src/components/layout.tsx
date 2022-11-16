import * as React from "react"
import { ReactNode } from 'react'
import '@trussworks/react-uswds/lib/uswds.css'
import '@trussworks/react-uswds/lib/index.css'
import './tfh.scss'

import { GovBanner, GridContainer, Grid, Header, Title, NavMenuButton } from '@trussworks/react-uswds'
import Navigation from "./navigation"
import Footer from "./footer"

interface ILayoutProps {
    children: ReactNode,
}


const Layout = ({ children }: ILayoutProps) => {
    const [navExpanded, setNavExpanded] = React.useState(false);
    const onNavExpand = (): void => setNavExpanded((prvExpanded) => !prvExpanded)



    return (
        <>
            <GovBanner />
            <Header extended={true}>
                <div className="usa-navbar">
                    <Title>TechFAR Hub
                        {/* TODO: Replace with a real component and not inline styles */}
                        <em style={{ display: 'block', fontSize: '50%', fontWeight: 'normal', }}>an initiative of US Digital Service</em>

                    </Title>
                    <NavMenuButton onClick={onNavExpand} label="Menu" />
                </div>
                <Navigation isNavExpanded={navExpanded} onNavExpanded={onNavExpand} />
            </Header>

            <main id="main-content">
                <GridContainer>
                    <Grid row>
                        {children}
                    </Grid>
                </GridContainer>
            </main>
            <Footer />
        </>
    )
}

export default Layout
