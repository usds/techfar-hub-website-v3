import * as React from "react"
import { ReactNode } from 'react'
import '@trussworks/react-uswds/lib/uswds.css'
import '@trussworks/react-uswds/lib/index.css'

import { GovBanner, GridContainer, Grid, Header, NavDropDownButton, Menu, Title, ExtendedNav, Search, NavMenuButton } from '@trussworks/react-uswds'


interface ILayoutProps {
    children: ReactNode,
}


const Layout = ({ children }: ILayoutProps) => {
    const [expanded, setExpanded] = React.useState(false);
    const onClick = (): void => setExpanded((prvExpanded) => !prvExpanded)
    const [isOpen, setIsOpen] = React.useState([false, false, false])
    /**
     * This toggle function will handle all navigation toggle links
     *
     * @param {number} index
     */
    const onToggle = (index: number): void => {
        // The setIsOpen is used to toggle the currently selected nav link
        setIsOpen((prevIsOpen) => {
            const newIsOpen = [...isOpen];
            newIsOpen[index] = !prevIsOpen[index];
            return newIsOpen;
        });
    };


    const getStartedSubItems = [
        <a href="#start">First item</a>
    ]

    const handbookItems = [
        <a href="#start">First item</a>
    ]

    const subMenuItems = [
        <a href="#linkOne" key="one">
            Simple link one
        </a>,
        <a href="#linkTwo" key="two">
            Simple link two
        </a>,
    ]

    const mainNavItems = [
        <>
            <NavDropDownButton
                onToggle={(): void => {
                    onToggle(0)
                }}
                menuId="getStartedDropdown"
                isOpen={isOpen[0]}
                label="Get Started"
                isCurrent={true}
            />
            <Menu
                key="getStarted"
                items={getStartedSubItems}
                isOpen={isOpen[0]}
            />
        </>,
        <>
            <NavDropDownButton
                onToggle={(): void => {
                    onToggle(1)
                }}
                menuId="learningCenterDropdown"
                isOpen={isOpen[1]}
                label="Learning Center"
                isCurrent={false}
            />
            <Menu
                key="learningCenter"
                items={subMenuItems}
                isOpen={isOpen[1]}
            />
        </>,

        <a href="#two" key="caseStudies" className="usa-nav__link">
            <span>Case Studies</span>
        </a>,
        <a href="#three" key="samples" className="usa-nav__link">
            <span>Samples &amp; Templates</span>
        </a>,
        <>
            <NavDropDownButton
                onToggle={(): void => {
                    onToggle(2)
                }}
                menuId="handbookDropdown"
                isOpen={isOpen[2]}
                label="Handbook"
                isCurrent={false}
            />
            <Menu
                key="handbook"
                items={handbookItems}
                isOpen={isOpen[2]}
            />
        </>,
        <a href="#three" key="history" className="usa-nav__link">
            <span>History of TFH</span>
        </a>,
        ]




    return (
        <>
            <GovBanner />
            <div className={`usa-overlay ${expanded ? 'is-visible' : ''}`}></div>
            <Header extended={true}>
                <div className="usa-navbar">
                    <Title>TechFAR Hub
                         {/* TODO: Replace with a real component and not inline styles */} 
                        <em style={{display: 'block', fontSize: '50%', fontWeight: 'normal',}}>an initiative of US Digital Service</em>

                    </Title>
                    <NavMenuButton onClick={onClick} label="Menu" />
                </div>
                <ExtendedNav
                    primaryItems={mainNavItems}
                    secondaryItems={[]}
                    mobileExpanded={expanded}
                    onToggleMobileNav={onClick}>
                </ExtendedNav>
            </Header>

            <main id="main-content">
                <GridContainer>
                    <Grid row>
                        {children}
                    </Grid>
                </GridContainer>
            </main>
        </>
    )
}

export default Layout
