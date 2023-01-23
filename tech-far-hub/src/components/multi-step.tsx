import * as React from "react";

import { Alert, Card, CardBody, CardGroup } from "@trussworks/react-uswds";

export const MultiStep = ({ children }: { children: React.ReactElement }) => {
  const errorMessage = (
    <Alert type="warning" headingLevel="h3" heading="Error in process list">
      A MultiStep list must be an ordered list.
      <a href="https://www.markdownguide.org/basic-syntax/#ordered-lists">See the markdown guide for examples.</a>
    </Alert>
  );

  if (children.type !== "ol") {
    return errorMessage;
  }

  const elementFilter = (item: React.ReactNode) => item && typeof item === "object" && "type" in item;
  let items = children.props.children.filter(elementFilter);

  if (
    !items.every((item: React.ReactNode) => item && typeof item === "object" && "type" in item && item.type == "li")
  ) {
    return errorMessage;
  }
  const [isVisible, setIsVisible] = React.useState([true, ...Array(items.length).fill(false)]);
  const handleClick = (index: number): void => {
    setIsVisible(() => {
      const newIsVisible = Array(isVisible.length).fill(false);
      newIsVisible[index] = true;
      return newIsVisible;
    });
  };

  const headings: React.ReactNode[] = [];
  const bodies: React.ReactNode[] = [];
  items.forEach((li: React.ReactNode, index: number) => {
    if (li && typeof li === "object" && "props" in li && "children" in li.props) {
      const filteredChildren = li.props.children.filter(elementFilter);
      headings.push(
        <li
          className={`usa-step-indicator__segment ${
            isVisible[index] ? "usa-step-indicator__segment--current" : "usa-step-indicator__segment--complete"
          }`}
          key={`multistep-heading-${index}`}
          onClick={() => handleClick(index)}
        >
          <div className="usa-step-indicator__segment-label" key={`multistep-indicator-${index}`}>
            {filteredChildren[0]}
          </div>
        </li>
      );
      bodies.push(
        <>
          {isVisible[index] && (
            <div key={`multistep-body-${index}`} className="tfh-multistep__content-item">
              {filteredChildren.slice(1)}
            </div>
          )}
        </>
      );
    }
  });

  return (
    <CardGroup>
      <Card key="tfh-multistep-wrapper">
        <CardBody>
          <div className="tfh-multistep">
            <div className="usa-step-indicator" aria-label="progress">
              <ol className="usa-step-indicator__segments">{headings}</ol>
            </div>
            <div className="tfh-multipstep__content-block">{bodies}</div>
          </div>
        </CardBody>
      </Card>
    </CardGroup>
  );
};
