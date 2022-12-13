import * as React from "react";

export const MultiStep = ({ children }) => {
  const [isVisible, setIsVisible] = React.useState([true, ...Array(4).fill(false)]);
  const handleClick = (index: number): void => {
    setIsVisible(() => {
      const newIsVisible = Array(isVisible.length).fill(false);
      newIsVisible[index] = true;
      return newIsVisible;
    });
  };
  return (
    <div className="tfh-multistep">
      <div className="usa-step-indicator" aria-label="progress">
        <ol className="usa-step-indicator__segments">
          <li
            className={`usa-step-indicator__segment ${
              isVisible[0] ? "usa-step-indicator__segment--current" : "usa-step-indicator__segment--complete"
            }`}
            onClick={() => handleClick(0)}
          >
            <span className="usa-step-indicator__segment-label">Step 1</span>
          </li>
          <li
            className={`usa-step-indicator__segment ${
              isVisible[1] ? "usa-step-indicator__segment--current" : "usa-step-indicator__segment--complete"
            }`}
            onClick={() => handleClick(1)}
          >
            <span className="usa-step-indicator__segment-label">Household status</span>
          </li>
          <li
            className={`usa-step-indicator__segment ${
              isVisible[2] ? "usa-step-indicator__segment--current" : "usa-step-indicator__segment--complete"
            }`}
            onClick={() => handleClick(2)}
          >
            <span className="usa-step-indicator__segment-label">Supporting documents</span>
          </li>
          <li
            className={`usa-step-indicator__segment ${
              isVisible[3] ? "usa-step-indicator__segment--current" : "usa-step-indicator__segment--complete"
            }`}
            onClick={() => handleClick(3)}
          >
            <span className="usa-step-indicator__segment-label">Signature</span>
          </li>
          <li
            className={`usa-step-indicator__segment ${
              isVisible[4] ? "usa-step-indicator__segment--current" : "usa-step-indicator__segment--complete"
            }`}
            onClick={() => handleClick(4)}
          >
            <span className="usa-step-indicator__segment-label">Review and submit</span>
          </li>
        </ol>
      </div>
      <div className="tfh-multipstep__content-block">
        <ol className="tfh-multistep__content-items">
          {isVisible[0] && (
            <li className="tfh-multistep__content-item">
              <p>Content 0</p>
            </li>
          )}
          {isVisible[1] && (
            <li className="tfh-multistep__content-item">
              <p>Content 1</p>
            </li>
          )}
          {isVisible[2] && (
            <li className="tfh-multistep__content-item">
              <p>Content 2</p>
            </li>
          )}
          {isVisible[3] && (
            <li className="tfh-multistep__content-item">
              <p>Content 3</p>
            </li>
          )}
          {isVisible[4] && (
            <li className="tfh-multistep__content-item">
              <p>Content 4</p>
            </li>
          )}
        </ol>
      </div>
    </div>
  );
};
