import * as React from "react";
import { Card, CardBody, Alert, Fieldset, Radio } from "@trussworks/react-uswds";
import { onlyText } from "react-children-utilities";

// Filter for getting rid of newlines and nulls in a list of nodes
const elementFilter = (item: React.ReactNode) => item && typeof item === "object" && "type" in item;

// Filter for getting OLs specifically
const olTest = (node: React.ReactNode) =>
  node &&
  typeof node === "object" &&
  "type" in node &&
  node.type == "ol" &&
  "props" in node &&
  "children" in node.props &&
  Array.isArray(node.props.children);

export const Assessment = ({ children }: { children: React.ReactNode }): JSX.Element => {
  // Expects an ordered list of lists --- each item in the outer list is a page of questions, and the
  // inner list are the options for the question.
  // Expects a final <ScorePage> with the rubric

  //Make sure we got roughly what we expected
  const errorMessage = (
    <Alert type="warning" headingLevel="h3" heading="Error in Assessment">
      An assessment must be an ordered list with a score section at the end
      <a href="https://www.markdownguide.org/basic-syntax/#ordered-lists">See the markdown guide for examples.</a>
    </Alert>
  );
  if (!(children && Array.isArray(children) && children.length === 2)) {
    return errorMessage;
  }

  // Make sure we got a score page too
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

  // Grab all the pages of the assessment (the assessment items)
  let items = assessmentQuestions.props.children.filter(elementFilter);

  if (
    !items.every((item: React.ReactNode) => item && typeof item === "object" && "type" in item && item.type == "li")
  ) {
    return errorMessage;
  }

  // Each assessment page will need its visibility and contribution to the score tracked
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

  // Pull the items into their own "screens" with the options
  const screens = items.map((item: React.ReactNode, index: number) => {
    let nextQuestionText = "Next Question";
    let nextQuestionLink: React.ReactElement;
    let atEnd = false;
    if (index === items.length - 1) {
      nextQuestionText = "Complete Assessment";
      atEnd = true;
    }
    nextQuestionLink = (
      <a
        onClick={() => {
          handleNextPrevClick(index + 1);
        }}
        className="tfh-assessment__next-question-link"
      >
        {nextQuestionText}
      </a>
    );
    return (
      <>
        {isVisible[index] && (
          <AssessmentItem itemNumber={index} handleUpdate={handleUpdateScore} currentScores={scores}>
            {item}
          </AssessmentItem>
        )}
        {isVisible[index] && nextQuestionLink}
      </>
    );
  });

  // Clone the rubric page so we can pass in the current score and a handler
  const newScore = (
    <AssessmentScore
      scores={scores}
      children={score.props.children}
      clickHandler={handleNextPrevClick}
    ></AssessmentScore>
  );
  // Add the rubric page to the end
  screens.push(<>{isVisible[items.length] && newScore}</>);

  return (
    <>
      <Card className="tfh-assessment">
        <CardBody>{screens}</CardBody>
      </Card>
    </>
  );
};

const AssessmentItem = ({
  children,
  itemNumber,
  handleUpdate,
  currentScores,
}: {
  children: React.ReactNode;
  itemNumber: number;
  handleUpdate: Function;
  currentScores: Number[];
}): JSX.Element => {
  // Each item is a list item that contains at least an ordered list of items
  // The points for each item are its position orinally in the list
  const errorMessage = (
    <Alert type="warning" headingLevel="h3" heading="Error in Assessment Item">
      An assessment item must contain an ordered list
      <a href="https://www.markdownguide.org/basic-syntax/#ordered-lists">See the markdown guide for examples.</a>
    </Alert>
  );
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
  // Do we have an OL to turn into the scores?
  if (!itemChildren.some(olTest)) {
    return errorMessage;
  }

  // Extract each list item and turn it into a radio option that contributes
  // to the overall score
  const processedChildren = itemChildren.map((child: React.ReactNode) => {
    if (child && olTest(child) && typeof child === "object" && "props" in child) {
      const rawAnswers = child.props.children.filter(elementFilter);
      return (
        <Fieldset>
          <ol className="add-list-reset">
            {rawAnswers.map((li: React.ReactElement, index: number) => {
              const liChildren = li.props.children;
              const points = index + 1;
              const name = `assessment-${itemNumber}`;
              const key = `assessment-${itemNumber}-${index}`;
              return (
                <li>
                  <Radio
                    id={key}
                    name={name}
                    label={`${points} - ${liChildren}`}
                    value={points}
                    onClick={() => handleUpdate(itemNumber, points)}
                    checked={currentScores[itemNumber] === points}
                  />
                </li>
              );
            })}
          </ol>
        </Fieldset>
      );
    } else {
      // Grab the first heading and turn it into an h3
      if (
        child &&
        typeof child == "object" &&
        "type" in child &&
        child.type === "p" &&
        "props" in child &&
        "children" in child.props
      ) {
        return <h3>{child.props.children}</h3>;
      } else {
        // Otherwise just return any other elements
        return child;
      }
    }
  });
  return <form>{processedChildren}</form>;
};

export const AssessmentScore = ({
  children,
  scores = [],
  clickHandler,
}: {
  children: React.ReactNode;
  scores?: Number[];
  clickHandler: Function;
}) => {
  // Expects a rubric that has list items that each contain
  // a score range
  const totalScore = scores.reduce((a, b) => +a + +b);
  const errorMessage = (
    <Alert type="warning" headingLevel="h3" heading="Error in score key">
      An assessment score must contain an ordered list of score ranges
      <a href="https://www.markdownguide.org/basic-syntax/#ordered-lists">See the markdown guide for examples.</a>
    </Alert>
  );
  if (!(children && Array.isArray(children) && children.some(olTest))) {
    return errorMessage;
  }
  return (
    <>
      <h3>Total: {String(totalScore)} Points</h3>
      {children.filter(elementFilter).map((item: React.ReactNode) => {
        if (item) {
          if (item && olTest(item) && typeof item === "object" && "props" in item) {
            return processScores(item.props.children.filter(elementFilter), totalScore);
          } else {
            return item;
          }
        }
      })}
      <span onClick={() => clickHandler(0)} className="usa-button">
        Retake Assessment
      </span>
      <span className="usa-clearfix"></span>
    </>
  );
};

const processScores = (lis: React.ReactElement[], score: Number) => {
  // The goal here is to extract the score bounds from list-items that look like
  // 1. Novice (9 - 18 total points)
  // The key are the numbers between parens, formatted with a hypen.
  return lis.map((li: React.ReactElement) => {
    if (li.props.children.length >= 2) {
      const rating = li.props.children.filter(elementFilter)[0];
      const ratingText = onlyText(rating);
      const ratingRange = ratingText.match(/\(\s*(?<lowBound>[0-9]+)\s*-\s*(?<highBound>[0-9]+).* points/);
      let lowBound, highBound;
      if (ratingRange && ratingRange.groups) {
        lowBound = Number(ratingRange.groups.lowBound);
        highBound = Number(ratingRange.groups.highBound);
        if (score >= lowBound && score <= highBound) {
          return li;
        }
      }
    }
  });
};
