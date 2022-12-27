# Updating TechFAR Hub: Overview

The [content of TechFAR Hub](https://github.com/usds/techfar-hub-website-v3/tree/main/tech-far-hub/content) is [formatted in Markdown](https://www.markdownguide.org/)/[MDX](https://mdxjs.com/) (for the web pages) or uploaded to the [/static/ directory on github](https://github.com/usds/techfar-hub-website-v3/tree/main/tech-far-hub/static) (for downloads and images). Updates to the markdown files will be automatically converted into web pages via [Github actions](https://github.com/usds/techfar-hub-website-v3/actions) and published to the web.

## Site capabilities

- The site offers a staging version --- if you [make a branch](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-branches) and commit your changes to it, a github action will run to publish you changes to a directory of https://usds.github.io/techfar-hub-staging-v3 and will add a comment to your commit with a link to the staging site for your branch. This process takes about 3 minutes as of the writing of these docs.
- Commits to the main branch automatically publish to the live site --- assuming the commits are all valid Markdown/MDX, they will rebuild and publish to the internet in 2-3 minutes.
- The site contents use an enhanced version of Markdown called [MDX](https://mdxjs.com/), which allows us to have some more sophisticated components added to pages with simple markdown. [See the advanced components section for details](advanced-components.md).
- Individual pages have metadata in their "frontmatter" (the section at the top of the file) to allow you to control the page's URL, on-page title, and position within navigation, and a variet of SEO fields. See [frontmatter](frontmatter.md) for details.
- Local navigation is automatically generated based on the site's folders, data in each page's frontmatter, and subheadings. See [about local and global site navigation](navigation.md) for details.

## Your first edits

To get started working on the site, we recommend beginning by editing an existing page. You can [follow the tutorial on editing existing content](tutorial-editing-existing.md) to get a feel for how editing works, from creating a branch to changing the markdown to publishing.

Following that, you'll probably want to check out the [basic markdown you'll need for TechFAR Hub](basic-markdown.md).

Once you're comfortable editing existing pages, read the [tutorial on adding new pages](tutorial-adding-new.md) pages to get comfortable filling in [frontmatter](frontmatter.md) and setting up proper headings for your new content.

## Diving deeper

Having learned how to edit existing pages and add new pages, you'll likely want to dive into how the site is built:

- Learn about the [overall site structure](overall-site-structure.md) to understand where new pages should go.
- Get fimilar with the [basics of github for content editors](github-for-content.md) to understand branches, commits, and the features we use to make this site on github.
- Check out the [advanced components](advanced-components.md) that you can use to enhance your pages for greater usability and interactivity.
- Get to know [page fragment and promo items](fragments-and-promo.md) to see how to update the homepage, landing pages, and content items that appear across the site.
- See the [markdown and content idioms](content-idioms.md) used repeatedly throughout the site, so that your new content is consistent with the existing site and takes advanges of its features.

## For Developers

This site is built on [GatsbyJS 5](https://www.gatsbyjs.com/) using typescript, and makes pretty heavy use of the [Trussworks USWDS 3.0 React Components](https://github.com/trussworks/react-uswds). The builds are entirely done using github actions, and hosting is via github pages. To dig in, see

- [the architectural overview](architectural-overview.md) for developers, that explains the logic behind the pseudo-CMS 
- [the MDX crashcourse](mdx-crash-course.mdx) to get up to speed on how this site uses JSX-in-Markdown via MDX
- [page building and graphql](pages-and-graphql.md) to get to understand the link between the markdown content, page templates, and the queries that generate everything.