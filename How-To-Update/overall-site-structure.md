# Overall Site Structure

TechFAR Hub version 3 uses folders to create URLs, local navigation, breadcrumbs, and the overall conceptual structure of the site. _However,_ the conceptual structure of the site doesn't perfectly match the folder structure. That's probably confusing, so read on and it might get clearer.

You can think of the site as having four "areas":

1. The procurement lifecycle information, which teach procurement professionals about agile procurements in a wholistic way. Pages that pertain to the contract lifecycle are
   1. [content/pre-solicitation](https://github.com/usds/techfar-hub-website-v3/tree/main/tech-far-hub/content/pre-solicitation)
   2. [content/solicitation](https://github.com/usds/techfar-hub-website-v3/tree/main/tech-far-hub/content/solicitation)
   3. [content/evaluation](https://github.com/usds/techfar-hub-website-v3/tree/main/tech-far-hub/content/evaluation)
   4. [content/contract-administration](https://github.com/usds/techfar-hub-website-v3/tree/main/tech-far-hub/content/contract-administration)
2. The "Get started" pages, which exist to orient folks who are new to this whole concept, and of which there are only two:
   1. [content/get-started/index.mdx](https://github.com/usds/techfar-hub-website-v3/blob/main/tech-far-hub/content/get-started/index.mdx)
   2. [content/get-started/ditap.mdx](https://github.com/usds/techfar-hub-website-v3/blob/main/tech-far-hub/content/get-started/ditap.mdx)
   3. [content/get-started/8a.mdx](https://github.com/usds/techfar-hub-website-v3/blob/main/tech-far-hub/content/get-started/8a.mdx)
3. The resources sections, which contain specific types of tools and documented precedents for practicing procurement professionals to draw on:
   1. [content/resources/case-studies](https://github.com/usds/techfar-hub-website-v3/tree/main/tech-far-hub/content/resources/case-studies)
   2. [content/resources/contract-solutions-vehicles/](https://github.com/usds/techfar-hub-website-v3/tree/main/tech-far-hub/content/resources/contract-solutions-vehicles)
   3. [content/resources/learning-center](https://github.com/usds/techfar-hub-website-v3/tree/main/tech-far-hub/content/resources/learning-center)
   4. [content/resources/policy-guidance](https://github.com/usds/techfar-hub-website-v3/tree/main/tech-far-hub/content/resources/policy-guidance)
   5. [content/resources/templates-samples](https://github.com/usds/techfar-hub-website-v3/tree/main/tech-far-hub/content/resources/templates-samples)
4. Automatically generated tags pages. You can't edit these pages directly, but they generate themselves from the tags on the site.

So, if you are writing about the procurement lifecycle directly, you'd want to put your page somewhere in that first grouping. If you are writing about a popular procurement program USDS has launched that folks who are new to the whole "TechFAR" thing might need to know about, add your page in the second section. If your content is more stand-alone, add it in the third. 

Because this is a website, you can _link_ from content in the various sections to one another. So, if you have written a case study that calks a lot about contract administration, you should by all means add [links](basic-markdown.md#links) back into the relevant pages in section 1. If it's contract administration for an 8a vendor, link to the 8a page in getting started, too.

If you have created some sort of ontological paradox and can't decide where you page should go, pick a spot and then create an [alias page](static-files-and-aliases.md#using-an-alias-page) in the other spot it should go.
