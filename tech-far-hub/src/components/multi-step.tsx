import { Alert } from "@trussworks/react-uswds";
import * as React from "react";
import { json } from "stream/consumers";

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

  const elementFilter = (item: React.ReactNode) => typeof item == typeof {} && "type" in item;
  let items = children.props.children.filter(elementFilter);

  if (!items.every((item) => item.type == "li")) {
    return errorMessage;
  }

  const headings: React.ReactNode[] = [];
  const bodies: React.ReactNode[] = [];
  items.forEach((li: React.ReactNode) => {
    console.log("\nNode: ");
    if (li && typeof li === "object" && "props" in li && "children" in li.props) {
      const filteredChildren = li.props.children.filter(elementFilter);
      console.log(filteredChildren);
      console.log("Heading: ", filteredChildren[0]);
      console.log("Bodies: ", filteredChildren.slice(1));
      headings.push(filteredChildren[0]);
      bodies.push(filteredChildren.slice(1));
    }
  });
  const [isVisible, setIsVisible] = React.useState([true, ...Array(headings.length).fill(false)]);
  const handleClick = (index: number): void => {
    setIsVisible(() => {
      const newIsVisible = Array(isVisible.length).fill(false);
      newIsVisible[index] = true;
      return newIsVisible;
    });
  };

  const headingElements = headings.map((node, index) => {
    return (
      <li
        className={`usa-step-indicator__segment ${
          isVisible[index] ? "usa-step-indicator__segment--current" : "usa-step-indicator__segment--complete"
        }`}
        onClick={() => handleClick(index)}
      >
        <div className="usa-step-indicator__segment-label">{node}</div>
      </li>
    );
  });
  const bodyElements = bodies.map((node, index) => {
    return <>{isVisible[index] && <li className="tfh-multistep__content-item">{node}</li>}</>;
  });
  return (
    <div className="tfh-multistep">
      <div className="usa-step-indicator" aria-label="progress">
        <ol className="usa-step-indicator__segments">{headingElements}</ol>
      </div>
      <div className="tfh-multipstep__content-block">
        <ol className="tfh-multistep__content-items">{bodyElements}</ol>
      </div>
    </div>
  );
};
