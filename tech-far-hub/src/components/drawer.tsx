import * as React from "react";
import { ReactNode } from "react";
import classnames from "classnames";
import { v4 as uuid } from "uuid";

interface IDrawerProps {
  children: ReactNode;
  heading: React.ReactNode | string;
  summary?: string;
  className?: string;
}

export const Drawer = ({ children, heading, summary, className }: IDrawerProps): JSX.Element => {
  const headingClasses = classnames("usa-accordion__heading", className);
  const contentClasses = classnames("usa-accordion__content", "usa-prose", className);
  const [isOpen, setIsOpen] = React.useState(false);
  const handleToggle = (): void => {
    console.log("isOpen", isOpen);
    setIsOpen(!isOpen);
  };
  const id = uuid();
  return (
    <div className="usa-accordion--bordered margin-bottom-2">
      <h2 className={headingClasses}>
        <button
          type="button"
          className="usa-accordion__button"
          aria-controls={id}
          aria-expanded={isOpen}
          onClick={handleToggle}
        >
          {heading}
          {summary && <p className="text-normal">{summary}</p>}
        </button>
      </h2>
      <div className={contentClasses} hidden={!isOpen}>
        {children}
      </div>
    </div>
  );
};
