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

Once you're comfortable editing existing pages, read the [tutorial on adding new pages](tutorial-adding-new.md) pages to get comfortable filling in [frontmatter](frontmatter.md) and setting up proper headings for your new content.