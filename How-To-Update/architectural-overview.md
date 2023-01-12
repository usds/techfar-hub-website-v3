# Architectural Overview

The goal with TechFAR Hub was to build something that approximates a CMS using just github's UI and actions. The big things I at least expect a CMS to do are 

1. allowing people who don't know HTML to post content to the web
2. wrapping that content in nice looking templates
3. providing some information architecture scaffolding 
4. allowing for content reuse

This site is built on [Gatsby 5](https://www.gatsbyjs.com/docs), and there are a couple gatsby features you'll want to understand to get the overall picture of how the site works:

- we have a custom [gatsby-node.ts](https://github.com/usds/techfar-hub-website-v3/blob/main/tech-far-hub/gatsby-node.ts) and uses the [createPages hook](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#createPages) to

    1. Read the frontmatter for a template name, which is then string-munged into one of the template names in [`src/pages`](https://github.com/usds/techfar-hub-website-v3/tree/main/tech-far-hub/src/pages)
    2. Build the tags pages
    3. Construct the data needed to build breadcrumbs and local navigation
- Each page template makes a [graphql](https://www.gatsbyjs.com/docs/reference/graphql-data-layer/graphql-api/) query for its own frontmatter, as well as child and sibling pages so that it can build its local navigation. To keep the templates as dry as possible, we use some [graphql fragments](https://www.gatsbyjs.com/docs/reference/graphql-data-layer/using-graphql-fragments/) that are defined in [`src/components/page-layout-nav.tsx`](https://github.com/usds/techfar-hub-website-v3/blob/main/tech-far-hub/src/components/page-layout-nav.tsx#L151)
- Pages themselves are built out of [mdx](https://www.gatsbyjs.com/docs/how-to/routing/mdx/), a superset of markdown that allows us to have [custom components](advanced-components.md).
  - If you want to add a new, custom MDX component, you just need to implement it and add it to the list in [`src/components/mdxcontent.tsx`](https://github.com/usds/techfar-hub-website-v3/blob/main/tech-far-hub/src/components/mdxcontent.tsx#L13). All the templates use that component to render their MDX.
- The stuff in the head of each page (except the homepage, because home pages are special) is controlled by the [`seo`](https://github.com/usds/techfar-hub-website-v3/blob/main/tech-far-hub/src/components/seo.tsx) component.


MDX and templates handle CMS-aspects 1 and 2 above. The information architecture scaffolding is provided via the use of folders, automatically generated local navigation, and tags.

## IA features

Within the `content` directory in the project, there are several sub folders that mirror the main navigation. The site assumes that pages in the same folder are siblings and must be related in some way, and therefore should share local navigation.