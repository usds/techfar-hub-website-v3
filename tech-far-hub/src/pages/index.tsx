import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import '@trussworks/react-uswds/lib/uswds.css'
import '@trussworks/react-uswds/lib/index.css'

import { GovBanner } from '@trussworks/react-uswds'


const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
      <GovBanner />
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>TechFAR Hub</title>
