import * as React from "react"
import type { HeadFC, PageProps, graphql } from "gatsby"
import { Grid } from '@trussworks/react-uswds'
import Layout from '../../components/layout'



const CaseStudyPage: React.FC<PageProps> = ({ data, children }) => {
  return (
    <Layout>
      <h2>{data.mdx.frontmatter.title}</h2>
      {children}
    </Layout>
  )
}

export default CaseStudyPage

export const Head: HeadFC = () => <title>TechFAR Hub</title>

export const query = graphql`
  query ($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
      }
    }
  }
`