import * as React from "react";
import { MDXProvider } from "@mdx-js/react";
import { Alert } from "./alert";
import { Summary } from "./summary";
import ExternalResources from "./external-resources";

const MDXContent = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const components = { Alert, Summary, ExternalResources };
  return <MDXProvider components={components}>{children}</MDXProvider>;
};

export default MDXContent;
