import { Alert, ProcessList as TWProcessList, ProcessListHeading, ProcessListItem } from "@trussworks/react-uswds";
import * as React from "react";

const processList = (children: React.ReactElement) => {
  const errorMessage = (
    <Alert type="warning" headingLevel="h3" heading="Error in process list">
      A process list must be an ordered list.
      <a href="https://www.markdownguide.org/basic-syntax/#ordered-lists">See the markdown guide for examples.</a>
    </Alert>
  );

  if (children.type !== "ol") {
    return errorMessage;
  }

  const elementFilter = (item: React.ReactNode) => item && typeof item === "object" && "type" in item;
  let items = children.props.children.filter(elementFilter);

  if (!items.every((item: React.ReactElement) => item.type == "li")) {
    return errorMessage;
  }
  return (
    <TWProcessList>
      {items.map((li: React.ReactElement, idx: number) => {
        if (typeof li.props.children === "string") {
          return (
            <ProcessListItem key={`process-list-item-${idx}`}>
              <ProcessListHeading type="h4" key={`process-list-heading-${idx}`}>{li.props.children}</ProcessListHeading>
            </ProcessListItem>
          );
        } else {
          const filteredChildren = li.props.children.filter(elementFilter);
          return (
            <ProcessListItem key={`process-list-item-${idx}`}>
              <ProcessListHeading type="h4" key={`process-list-heading-${idx}`}>{filteredChildren[0].props.children}</ProcessListHeading>
              {filteredChildren.length > 1 && filteredChildren.slice(1)}
            </ProcessListItem>
          );
        }
      })}
    </TWProcessList>
  );
};
export const ProcessList = ({ children }: { children: React.ReactElement }): JSX.Element => {
  return <div className="process-list">{processList(children)}</div>;
};
