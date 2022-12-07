import React from "react";

const ExternalResouces = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <div className="tfh-externalResources">
      <h3>External Resources</h3>
      {children}
    </div>
  );
};

export default ExternalResouces;
