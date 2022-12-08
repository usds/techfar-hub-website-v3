import { Card, CardHeader, CardMedia, CardBody, CardFooter } from "@trussworks/react-uswds";
import { Link, withPrefix } from "gatsby";
import * as React from "react";

// TODO: Add media alt text
interface IInitiativeProps {
  children: React.ReactNode;
  heading: React.ReactNode | string;
  media: any;
  destination: string;
}

export const Initiative = ({ children, heading, media, destination }: IInitiativeProps): JSX.Element => {
  return (
    <Card layout="flagDefault" headerFirst gridLayout={{ tablet: { col: 12 } }}>
      <CardHeader>
        <h3 className="usa-card__heading">{heading}</h3>
      </CardHeader>
      <CardMedia exdent>
        <img src={withPrefix(media)} alt="A stock image" />
      </CardMedia>
      <div className="tfh-initiativeCard-internal">
        <CardBody>
          <p>{children}</p>
        </CardBody>
        <CardFooter>
          <Link to={destination} className="usa-button">
            View
          </Link>
        </CardFooter>
      </div>
    </Card>
  );
};
