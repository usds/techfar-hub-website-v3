import dedent from "ts-dedent";

export const getBasicTemplate = (heading: string, template: string, slug: string, page_type: string): string => {
  return dedent(`
    ---
    slug: ${slug}
    template: ${template}
    heading: ${heading}
    page_type: ${page_type}
    promo_description: Fill this in
    nav_weight: 1000
    is_featured: false
    ---
    ## Add your content here

    Here is some body copy
    `);
};
