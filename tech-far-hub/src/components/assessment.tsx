import { Card, CardBody, Alert } from "@trussworks/react-uswds";
import * as React from "react";

export const AssessmentScore = ({
  children,
  scores = [],
}: {
  children: React.ReactNode;
  scores?: Number[];
}): JSX.Element => {
  return (
    <>
      {JSON.stringify(scores)}
      {children}
    </>
  );
};

const elementFilter = (item: React.ReactNode) => item && typeof item === "object" && "type" in item;

const AssessmentItem = ({
  children,
  itemNumber,
  handleUpdate,
}: {
  children: React.ReactNode;
  itemNumber: number;
  handleUpdate: Function;
}): JSX.Element => {
  const errorMessage = (
    <Alert type="warning" headingLevel="h3" heading="Error in process list">
      An assessment item must contain an ordered list
      <a href="https://www.markdownguide.org/basic-syntax/#ordered-lists">See the markdown guide for examples.</a>
    </Alert>
  );
  console.log(children);
  if (
    !(
      children &&
      typeof children === "object" &&
      "props" in children &&
      "children" in children.props &&
      Array.isArray(children.props.children)
    )
  ) {
    return errorMessage;
  }

  const itemChildren: React.ReactNode[] = children.props.children.filter(elementFilter);
  const olTest = (node: React.ReactNode) =>
    node &&
    typeof node === "object" &&
    "type" in node &&
    node.type == "ol" &&
    "props" in node &&
    "children" in node.props &&
    Array.isArray(node.props.children);

  // Do we have an OL to turn into the scores?
  if (!itemChildren.some(olTest)) {
    return errorMessage;
  }

  const processedChildren = itemChildren.map((child: React.ReactNode) => {
    if (child && olTest(child)) {
      const rawAnswers = child.props.children.filter(elementFilter);
      return (
        <form>
          <fieldset className="usa-fieldset-inputs">
            <ol>
              {rawAnswers.map((li: React.ReactElement, index: number) => {
                const liChildren = li.props.children;
                const points = index + 1;
                const name = `assessment-${itemNumber}`;
                const key = `assessment-${itemNumber}-${index}`;
                return (
                  <li>
                    <input
                      onClick={() => handleUpdate(itemNumber, points)}
                      type="radio"
                      name={name}
                      id={key}
                      key={key}
                      value={index + 1}
                    ></input>
                    <label htmlFor={key}>
                      {points} - {liChildren}
                    </label>
                  </li>
                );
              })}
            </ol>
          </fieldset>
        </form>
      );
    } else {
      return child;
    }
  });
  return <>{processedChildren}</>;
};

export const Assessment = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const errorMessage = (
    <Alert type="warning" headingLevel="h3" heading="Error in process list">
      An assessment must be an ordered list with a score section at the end
      <a href="https://www.markdownguide.org/basic-syntax/#ordered-lists">See the markdown guide for examples.</a>
    </Alert>
  );
  if (!(children && Array.isArray(children) && children.length === 2)) {
    return errorMessage;
  }
  let assessmentQuestions: React.ReactElement;
  let score: React.ReactElement;
  if (typeof children[0] === "object" && "type" in children[0] && children[0].type === "ol") {
    assessmentQuestions = children[0];
  } else {
    return errorMessage;
  }
  if (typeof children[1] === "object") {
    score = children[1];
  } else {
    return errorMessage;
  }

  let items = assessmentQuestions.props.children.filter(elementFilter);

  if (
    !items.every((item: React.ReactNode) => item && typeof item === "object" && "type" in item && item.type == "li")
  ) {
    return errorMessage;
  }
  const [isVisible, setIsVisible] = React.useState([true, ...Array(items.length + 1).fill(false)]);
  const [scores, setScores]: [Number[], React.Dispatch<React.SetStateAction<Number[]>>] = React.useState(
    Array(items.length).fill(1)
  );
  const handleNextPrevClick = (index: number): void => {
    setIsVisible(() => {
      const newIsVisible = Array(isVisible.length).fill(false);
      newIsVisible[index] = true;
      return newIsVisible;
    });
  };

  const handleUpdateScore = (index: number, points: number): void => {
    setScores(() => {
      const newScores = [...scores];
      newScores[index] = points;
      return newScores;
    });
  };
  const screens = items.map((item: React.ReactNode, index: number) => {
    let nextQuestionText = "Next Question";
    let nextQuestionLink: React.ReactElement;
    let atEnd = false;
    if (index === items.length - 1) {
      nextQuestionText = "Complete Assessment";
      atEnd = true;
    }
    const prevQuestionLink = (
      <span
        onClick={() => {
          handleNextPrevClick(index - 1);
          return false;
        }}
        className="usa-button"
      >
        Previous Question
      </span>
    );

    nextQuestionLink = (
      <span
        onClick={() => {
          handleNextPrevClick(index + 1);
          return false;
        }}
        className="float-right usa-button"
      >
        {nextQuestionText}
      </span>
    );
    return (
      <>
        {isVisible[index] && (
          <AssessmentItem itemNumber={index} handleUpdate={handleUpdateScore}>
            {item}
          </AssessmentItem>
        )}
        {isVisible[index] && index > 0 && prevQuestionLink}
        {isVisible[index] && nextQuestionLink}
      </>
    );
  });
  const newScore = <AssessmentScore scores={scores} children={score.props.children}></AssessmentScore>;
  screens.push(<>{isVisible[items.length] && newScore}</>);
  return (
    <>
      <Card>
        <CardBody>{screens}</CardBody>
      </Card>
    </>
  );
};
