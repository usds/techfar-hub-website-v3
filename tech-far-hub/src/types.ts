import { PageProps } from "gatsby";

export interface IBreadcrumb {
  label: string;
  path: string;
}

export interface IPageContext {
  id: string;
  breadCrumbs: IBreadcrumb[];
  pathParts: string[];
  parentPath: string;
}
