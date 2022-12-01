export interface IBreadcrumb {
  label: string;
  path: string;
}

export interface IPageContext {
  id: string;
  breadCrumbs: [IBreadcrumb];
  pathParts: [string];
}
