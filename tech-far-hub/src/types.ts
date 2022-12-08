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
