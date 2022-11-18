import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { graphql } from "gatsby"
import { CardGroup, Card, CardHeader, CardBody, CardFooter, Button } from '@trussworks/react-uswds'
import Layout from '../../components/layout'
import { MDXProvider } from "@mdx-js/react"

const GetStartedPage: React.FC<PageProps> = ({ data, children }) => {
  return (
    <Layout>
      <h2>{data.getStarted.nodes[0].frontmatter.heading}</h2>
      <hr />
      {children}
      <p className='usa-updated'>Updated: {data.getStarted.nodes[0].frontmatter.updated}</p>
      <CardGroup>
        {
          data.lifecycle.nodes.map((node) => (
            <Card
              headerFirst
              gridLayout={{ tablet: { col: 3 } }}
              >
              <CardHeader className="bg-base-lightest">
                <h3 className="usa-card__heading">{node.frontmatter.lifecycle_stage} {node.frontmatter.heading}</h3>
              </CardHeader>
              <CardBody>
                <p>{node.frontmatter.description}</p>
              </CardBody>
              <CardFooter>
                <Button type="button" secondary>Go</Button>
              </CardFooter>
            </Card>
          ))
        }
      </CardGroup>
    </Layout>
  )
}

export default GetStartedPage

export const Head: HeadFC = () => <title>TechFAR Hub: Get Started</title>

export const query = graphql`
query {
   lifecycle: allMdx(
    filter: {internal: {contentFilePath: {regex: "/.*get-started\/(?!index.mdx)/"}}}
    sort: {frontmatter: {lifecycle_stage: ASC}}
  ) {
    nodes {
      frontmatter {
        slug
        heading
        lifecycle_stage
        updated(formatString: "MM/D/YYYY")
        description
      }
    }
  }
  getStarted: allMdx(
    filter: {internal: {contentFilePath: {regex: "/.*get-started\/index.mdx/"}}}
  ) {
    nodes {
      frontmatter {
        slug
        heading
        seo_title
        updated(formatString: "MM/D/YYYY")
        tags
      }
      id
      body
    }
  }  
}
`