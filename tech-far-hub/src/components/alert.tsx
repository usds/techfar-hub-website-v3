import * as React from "react";

export const Alert = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <div className="usa-alert usa-alert--warning">
      <div className="usa-alert__body">
        <h4 className="usa-alert__heading">TODO or Question</h4>
        <p className="usa-alert__text">{children}</p>
      </div>
    </div>
  );
};
