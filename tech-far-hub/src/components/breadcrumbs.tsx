import * as React from "react";
import { BreadcrumbBar, BreadcrumbLink, Breadcrumb } from "@trussworks/react-uswds";
import { IBreadcrumb } from "../types";
import { withPrefix } from "gatsby";

export const Breadcrumbs = ({ breadCrumbs }: { breadCrumbs: IBreadcrumb[] }) => {
  const rows: JSX.Element[] = [];
  breadCrumbs.forEach((crumbData, index) => {
    if (index < breadCrumbs.length - 1) {
      rows.push(
        <Breadcrumb key={`crumb-${index}`}>
          <BreadcrumbLink href={withPrefix(crumbData.path)}>
            <span>{crumbData.label}</span>
          </BreadcrumbLink>
        </Breadcrumb>
      );
    } else {
      rows.push(
        <Breadcrumb current key="crumb-current">
          <span>{crumbData.label}</span>
        </Breadcrumb>
      );
    }
  });
  return <BreadcrumbBar>{rows}</BreadcrumbBar>;
};
