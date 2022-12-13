import type { PageProps } from "gatsby";
import { DeepPick } from "ts-deep-pick";

export interface IBreadcrumb {
  label: string;
  path: string;
}

export interface IPageContext {
  id: string;
  breadCrumbs: IBreadcrumb[];
  pathParts: string[];
  parentPath: string;
  parentPathRegex: string;
  childPathRegex: string;
  isIndex: boolean;
}

export interface IMinimalFrontmatter {
  heading: string | null;
  slug: string | null;
}

export interface ITOCItem {
  url: string;
  title: string;
}

export type TableOfContents = { currentPage: { tableOfContents: Record<string, ITOCItem[]> } };

export type MinimalPageQuery = {
  readonly currentPage: {
    readonly tableOfContents: Record<string, ITOCItem | unknown> | null;
    readonly frontmatter: IMinimalFrontmatter | null;
  } | null;
  readonly siblings: { readonly nodes: ReadonlyArray<{ readonly frontmatter: IMinimalFrontmatter | null }> };
};

export type TOCEnhancedQueryPageProps<T extends MinimalPageQuery> = PageProps<
  Omit<T, "currentPage"> & (DeepPick<T, "currentPage.!tableOfContents"> & TableOfContents),
  IPageContext
>;
