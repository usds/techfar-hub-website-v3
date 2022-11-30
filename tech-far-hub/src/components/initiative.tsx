import { Link } from "gatsby";
import * as React from "react";

interface IInitiativeProps {
  children: React.ReactNode;
  heading: React.ReactNode | string;
  destination: string;
}

export const Initiative = ({ children, heading, destination }: IInitiativeProps): JSX.Element => {
  return (
    <div className="tfh-initiative-preview">
      <h4>{heading}</h4>
      <p>{children}</p>
      <Link to={destination} key={destination}><span className="tfh-link-span"></span></Link>
    </div>
  );
};
