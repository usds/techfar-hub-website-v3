# Basic Markdown

If you're going to edit often, you'll almost certainly want to read [Github's basic markdown writing and formatting syntax](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax). But, if you're in a hurry, you can probably get by knowing only a small number of features.

## Frontmatter

At the top of every markdown file, there is a section of _metadata_ called the [frontmatter](frontmatter.md), that tells the site what URL to give each page, what its title is, how to tag the page, and other data necessary to actually create the site. It looks like this:

```
---
slug: agile-overview
heading: Agile Overview
template: lifecycle
nav_weight: 10
---
```

Unless you've read the [frontmatter](frontmatter.md) page and understood it pretty thoroughly, don't edit the parts prior to the colon (e.g., `slug:`, `heading:`, `template:`, `nav_weight:`). You can, however, edit the values (e.g., `agile-overview`, `Agile Overview`, `lifecycle`, `nav_weight`) if you need to. 

The three frontmatter values you're most likely to want to edit are the

* slug, which is the page's part of its URL
* heading, which is used as the first H1 on the page (the largest heading) and the title tag (by default)
* nav_weight, which is used to decide where in the left navigation the page shows up; lower weights float to the top

## Headings

Markdown uses octothorpes `#` (or hashtags) for headings. The more `#`s in a row, the smaller the heading. On our pages, you'll basically never use a single `#` --- the H1 comes from the heading in the frontmatter.

Second level headings, or `##` are used to break up page sections. On lifecycle and case study pages, they get automatic links in the left nav, creating a table of contents for the page. So, a second-level heading would look like:

```markdown
## About this page
```

Third-level through sixth level (`###`, `####`, `#####`, `######`) are used as subheadings under a second-level heading to improve readability. Nothing cool or automatic happens with them, but they're useful for creating a skimmable outline of you content. As an example

```markdown
## About this page

This is an amazing page that has a lot of great content about cats and their habits.

### What cats like to eat

Cats love to eat food.
```

There is no heading-level below heading six. Just stop it.

## Paragraphs

A cool thing about markdown is paragraphs look just like, well, paragraphs. No markup needed --- just write text and separate paragraphs with a blank line.

## Links

There are a bunch of ways to write links in markdown. Here's the one you should use on this site:

```markdown
[The link text](/the/link/url)
```

When the site builds, the link text will be a link with an underline, and when you click it, it'll go to `/the/link/url`. If the URL is to another site (e.g., `[See the page on SAM.gov](https://sam.gov)`), the link will get a little arrow that indicates that it's an offsite link. If the link is to a document, like a PDF or word doc (e.g.e, `[Download the agile estimator](/assets/files/agile-estimator.docx)`), it'll get a cute little icon for its file type. This all happens automatically.

### A few notes on links

#### Longer link text is better
When you're writing your link text, try to make the actual linked text descriptive --- prefer `[Learn about pricing agile contract](/learning-center/pricing)` to `[Learn](/learning-center/pricing) about pricing` or, even worse, `[Read more](/learning-center/pricing) to learn about pricing` --- people skim for links, so making them specific and content-rich helps that process.

#### Use relative links to content on the site
If you're linking to a page that exists on the site, such as _Market Research_, don't link the whole URL. Instead, just link the _path_ part that comes after the domain. So,

* Do this: [Market Research](/pre-solicitation/market-research/)
* **not** this: [Market Research](https://techfarhub.usds.gov/pre-solicitation/market-research/)

That way the link won't look like an external link.

## Lists

The site makes **heavy** use of lists, especially ordered lists, for both regular text content and more complex interactive components.

### Ordered lists

An ordered list is a series of lines that start with a number and a period. The simplest version looks like this:

```markdown
1. First item
2. Second item
3. Third item
```

Note that the numbers don't actually have to be consecutive; they'll get re-written when the page gets rendered. So, this is equivalent to the above:

```markdown
1. First item
1. Second item
1. Third item
```

You can have content under each list item, and we use this idiom throughout the site --- for example, the fancy-looking numbered list under "How to use TechFAR Hub" on the Get Started page is actually a numbered list that has a little extra markup around it (see [[advanced components](advanced-components.md)]). Since it's a good, complex example of a list within a list, here's what it looks like

```markdown
1. Determine Where You Are in the Acquisition Lifecycle

    Whether you’re working a brand new procurement or need some help with evaluation criteria, we make it easy to find the help you need. Content is organized into four acquisition lifecycle stages: 

    1. [Pre-Solicitation](/pre-solicitation/),
    2. [Solicitation](/solicitation/), 
    3. [Evaluation](/evaluation/), 
    4. [Contract Administration](/contract-administration/). 
    
    Within each stage, you’ll find relevant guidance, tools, and templates to help you succeed. 

2. Browse Tools, Templates, and Samples

    Looking for inspiration? Imitation is the sincerest form of flattery, which is why we’re collecting a repository of useful tools, templates and samples proven to be successful in the public sector. Jump directly to this page and see what’s in our library, and find out how you can contribute your own. 

3. Review Our Case Studies

 
    Case studies are a great way to learn from the success of others. We’re adding new case studies often, in collaboration with smart professionals all over the government. Do you have a case study or situation you think would make a great case study? We’d love to consider it for inclusion in the TechFAR Hub! You may even get some swag out of it. 
```

Note that the content that goes under the list item is preceded by at least one blank lines and is indented by four spaces. This tells the system that the content is still part of the bullet and not its own paragraphs.

### Unordered list

Unordered lists are almost identical to ordered lists, only instead of numerals they use hyphens (`-`). So, a simple unordered list looks like

```markdown
- Item one
- Item two
- Item three
```

Unordered lists can also have items under the bullets, just like ordered lists. They can also have sub bullets, which are just indented by two spaces.

```markdown
- Parent item
  - Child item 1

    I'm some content that's a part of child item 1
  - Child item 2
    - Grand-child item
- Other parent item
```


## Images

Images are included with their alt text in form that looks a lot like a link

```markdown
![The alt text](/assets/images/img/techfar1.jpg)
```

Note the exclamation point (`!`) at the front. Please write descriptive alt text for readers who are vision impaired. 


## Bold and Italic

You can **bold** text by surrounding it in astericks (`*`) like so

```markdown
You can **bold** text by surrounding it in astericks (`*`) like so
```

And you can _italicize_ text but surrounding it in underbars (`_`), like so

```markdown
And you can _italicize_ text but surrounding it in underbars (`_`), like so
```

## Tables

Tables are formatted using pipes (`|`) and hyphens. You separate cells with pipes, and you separate rows with cells full of hyphens. The first row automatically becomes the heading. A simple table looks like this:

```markdown
| heading 1 | heading 2 |
| --------- | --------- |
|   baz     |    bim    |
| --------- | --------- |
|   foo     |    bar    |
```

Note that the pipes don't have to line up --- this will work just as well, although it's annoying later to edit

```markdown
| heading 1 | heading 2 |
| --- | -- |
| baz | bim |
| ----- | --- |
| foo | bar |
```
