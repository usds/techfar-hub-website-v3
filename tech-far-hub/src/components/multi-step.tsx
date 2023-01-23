import * as React from "react";

import { Alert, Card, CardBody, CardGroup } from "@trussworks/react-uswds";
import { v4 as uuidv4 } from "uuid";

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
  const multiStepId = uuidv4();
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
          key={`multistep-${multiStepId}-heading-${index}`}
        >
          <div className="usa-step-indicator__segment-label" key={`multistep-${multiStepId}--indicator-${index}`}>
            {!isVisible[index] && (
              <a
                key={`multistep-${multiStepId}-heading-control-${index}`}
                href="#"
                aria-selected={!!isVisible[index]}
                role="tab"
                tabIndex={isVisible[index] ? -1 : 0}
                id={`multistep-${multiStepId}-heading-${index}`}
                onClick={(event) => {
                  handleClick(index);
                  event.preventDefault();
                }}
              >
                {filteredChildren[0]}
              </a>
            )}
          
            {isVisible[index] && (<div
                aria-selected={!!isVisible[index]}
                role="tab"
                tabIndex={isVisible[index] ? -1 : 0}
                id={`multistep-${multiStepId}-heading-${index}`}>{filteredChildren[0]}</div>)}
          </div>
        </li>
      );
      bodies.push(
        <div
          key={`multistep-${multiStepId}-body-wrapper-${index}`}
          role="tabpanel"
          aria-labelledby={`multistep-${multiStepId}-heading-${index}`}
          tabIndex={0}
        >
          {isVisible[index] && (
            <div key={`multistep-${multiStepId}-body-${index}`} className="tfh-multistep__content-item">
              {filteredChildren.slice(1)}
            </div>
          )}
        </div>
      );
    }
  });

  return (
    <CardGroup className="tfh-multistep-container">
      <Card key={`tfh-multistep-${multiStepId}-wrapper`} role="tablist">
        <CardBody>
          <div className="tfh-multistep" key={`tfh-multistep-${multiStepId}`}>
            <div
              className="usa-step-indicator"
              aria-label="progress"
              key={`tfh-multistep-indicator-wrapper-${multiStepId}`}
            >
              <ol className="usa-step-indicator__segments" key={`tfh-multistep-${multiStepId}-headings-container`}>
                {headings}
              </ol>
            </div>
            <div className="tfh-multipstep__content-block" key={`tfh-multistep-${multiStepId}-bodies-container`}>
              {bodies}
            </div>
          </div>
        </CardBody>
      </Card>
    </CardGroup>
  );
};
