import * as React from "react";
import { ISEOFrontmatter } from "../types";

export const SEO = ({ frontmatter }: { frontmatter?: ISEOFrontmatter | null }) => {
  const titleTag = frontmatter?.meta_title ?? frontmatter?.heading ?? "TechFAR Hub";
  return (
    <>
      <title>{titleTag}</title>
    </>
  );
};
