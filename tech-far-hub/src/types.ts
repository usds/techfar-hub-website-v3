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
  filePath: string;
  isIndex: boolean;
}

export interface IMinimalFrontmatter {
  heading: string | null;
  slug: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  promo_description?: string | null;
  robots?: string | null;
  canonical?: string | null;
}

export interface ISEOFrontmatter extends IMinimalFrontmatter {
  meta_title?: string;
  meta_description?: string;
  promo_description?: string;
  robots?: string;
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

export enum DownloadFileType {
  Word,
  Pdf,
  Other,
}

export interface IURLInfo {
  readonly original: string;
  get authoritative(): string;
  get isAbsolute(): boolean;
  get isDownload(): boolean;
  get fileType(): DownloadFileType | null;
  get isExternal(): boolean;
}
