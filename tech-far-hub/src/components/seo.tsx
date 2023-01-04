import * as React from "react";
import { IMinimalFrontmatter } from "../types";

export const SEO = ({ frontmatter }: { frontmatter?: IMinimalFrontmatter | null }) => {
  const titleTag = frontmatter?.meta_title ?? frontmatter?.heading ?? "TechFAR Hub";
  const description = frontmatter?.meta_description ?? frontmatter?.promo_description ?? null;
  const robots = frontmatter?.robots;
  const canonical = frontmatter?.canonical;
  return (
    <>
      <title>{titleTag}</title>
      <meta name="title" content={titleTag} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      {description && <meta name="description" content={description} />}
      {robots && <meta name="robots" content={robots} />}
      {canonical && <link rel="canonical" href={canonical} />}
    </>
  );
};
