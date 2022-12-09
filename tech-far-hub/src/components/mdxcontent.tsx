import * as React from "react";
import { MDXProvider } from "@mdx-js/react";
import { Alert } from "./alert";
import { Summary } from "./summary";
import ExternalResources from "./external-resources";
import { ProcessList } from "./process-list";

const MDXContent = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const components = { Alert, Summary, ExternalResources, ProcessList };
  return <MDXProvider components={components}>{children}</MDXProvider>;
};

export default MDXContent;
