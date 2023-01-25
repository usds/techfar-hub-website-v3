import * as React from "react";

export const Summary = ({ children, heading }: { children: React.ReactNode; heading?: string }): JSX.Element => {
  heading = heading ? heading : "Summary";
  return (
    <div className="usa-alert usa-alert--info">
      <div className="usa-alert__body">
        <h4 className="usa-alert__heading">{heading}</h4>
        <div className="usa-alert__text">{children}</div>
      </div>
    </div>
  );
};
