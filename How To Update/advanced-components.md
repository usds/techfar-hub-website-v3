# Advanced Components <!-- omit in toc -->

When we said the site uses [markdown](basic-markdown.md) on those other pages, we fibbed a little --- the site uses a superset of markdown called [MDX](https://mdxjs.com/), which allows us to add special "components" to our pages to make them look more interesting or to include interactive elements.

Because components require more care to use than the rest of the markdown, we've tried to keep them as simple as we can manage --- in general, a component will simply be a wrapper around a list, and it will use the list to figure out its content. The general form for components looks like

```markdown
<ComponentName>
- A heading or link or something

    The content contained under that heading or link or whatever
- The next heading or link

    The content for that next heading or link

</ComponentName>
```

The thing to notice in the above are the "tags", which start with `<` and end with `>`. Each component starts with an "opening tag," like `<ComponentName>` and terminated with a "closing tag," which is the component name prefixed by a forward slash: `</ComponentName>`. This tells the site where the component starts and stops --- you can think of them as fancy parentheses in a sentence.

We have the following custom components, listed in order of likelihood you'll want to use them:

- [Summary](#summary)
- [External Resource](#external-resource)
- [ProcessList](#processlist)
- [MultiStep](#multistep)
- [Assessment and AssessmentScore](#assessment-and-assessmentscore)


## Summary

The _Summary_ component allows you to, well, summarize the main topics of a page at the top. This makes it easier for visitors to digest long pages. 

The majority of pages have a `<Summary></Summary>` section at the top. Summaries look like this:

![Summary component](images/summary-component.png)

A _Summary_ component can technically contain any markdown you want --- typically, on this site, they contain a bulleted list. The markdown for the above example looks like:

```markdown
<Summary>
- Agile software development is a method of software development that utilizes an iterative development process, designs services based on real user needs, and constantly improves software from user feedback.
- While not appropriate for all IT needs, when used appropriately, agile generally leads to better outcomes.
- It is possible to work collaboratively with a contractor, in the spirit of agile, while maintaining proper ethical boundaries, per FAR 9.504 and 9.505.
</Summary>
```

## External Resource

The `<ExternalResource></ExternalResource>` component allows you to include a list of links at the bottom of a page to direct visitors to additional information that might be related to the subject. They are used at the end of pages. They look like this:

![An example external resource component](images/external-resource-component.png)


An _External Resource_ is an unordered list with links under each bullet. They can have a custom heading and a custom image. The markup for the above component looks like:

```markdown
<ExternalResources heading="Additional resources" media="/assets/img/ux-indonesia-8mikJ83LmSQ-unsplash.jpg" media_alt="People working together">
- First Resource

    [Describe the resource](/learning-center/)

- Second Resource

    [Describe the resource and link it](/pre-solicitation/)


- Third resources

    [Describe the resource](/contract-administration/)

- Fourth resource

    [Describe the resource](/evaluation/)

</ExternalResources>
```

## ProcessList

A `<ProcessList></ProcessList>` breaks down a complex, ordered process into smaller steps. It looks like this on the site:

![A process list component](images/process-list.png)

A process list contains an ordered list. The list items are the headings, and the content under them is, well, the content under the headings. Here's what the code looks like for the above one:

```markdown
<ProcessList>
1. Determine Where You Are in the Acquisition Lifecycle

    Whether you’re working a brand new procurement or need some help with evaluation criteria, we make it easy to find the help you need. Content is organized into four acquisition lifecycle stages: 

    1. [Pre-Solicitation](/pre-solicitation/),
    2. [Solicitation](/solicitation/), 
    3. [Evaluation](/evaluation/), 
    4. [Contract Administration](/contract-administration/). 
    
    Within each stage, you’ll find relevant guidance, tools, and templates to help you succeed. [Link to Acq Lifecycle Landing Page]

2. Browse Tools, Templates, and Samples

    Looking for inspiration? Imitation is the sincerest form of flattery, which is why we’re collecting a repository of useful tools, templates and samples proven to be successful in the public sector. Jump directly to this page and see what’s in our library, and find out how you can contribute your own. [Link to this Resources subpage]

3. Review Our Case Studies

    Case studies are a great way to learn from the success of others. We’re adding new case studies often, in collaboration with smart professionals all over the government. Do you have a case study or situation you think would make a great case study? We’d love to consider it for inclusion in the TechFAR Hub! You may even get some swag out of it. [Link to this Resources subpage]
</ProcessList>
```

## MultiStep

The `<MultiStep></MultiStep>` is an interactive component that allows you to display multiple, related concepts in a single area. It looks like this:

![A multi-step component](images/multistep.png)

Each bold item at the top is clickable.

The markdown is very similar to the [_ProcessList_](#processlist) --- the core is an ordered list, where the headings are the list items and the content is the content under the list item. To create one like the above, the markdown looks like

```markdown
<MultiStep>

1. Pre-Solicitation

    The pre-solicitation phase of the acquisition lifecycle is where planning, market research, and requirements development occur.

2. Solicitation

    After you’ve completed pre-solicitation activities, it’s time to solicit offers from industry during the solicitation phase.

3. Evaluation

   Offers are in and it’s time to select the contractor who is best suited for the job, based on the criteria you develop in the Evaluation phase of the acquisition lifecycle.

4. Contract Administration

    When you’ve completed all the pre-award activities, from acquisition planning through evaluation and award, it’s time to focus on delivery.

</MultiStep>
```


## Assessment and AssessmentScore

The `<Assessment></Assessment>` component allows you to build a scored quiz/assessment to help visitors assess something they're working on. This is the most involved component, but it follows the same form as the others --- if you can make a process list, you can make a new assessment.

An _Assessment_ looks like this: 

![Assessment Component](images/assessment.png)