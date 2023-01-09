import { Card, CardHeader, CardMedia, CardBody, CardFooter } from "@trussworks/react-uswds";
import { Link, withPrefix } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import * as React from "react";

// TODO: Add media alt text
interface IInitiativeProps {
  children: React.ReactNode;
  heading: React.ReactNode | string;
  media: any;
  media_alt: string;
  destination: string;
}

export const Initiative = ({ children, heading, media, media_alt, destination }: IInitiativeProps): JSX.Element => {
  const image = getImage(media);
  return (
    <Card layout="flagDefault" headerFirst gridLayout={{ tablet: { col: 12 } }}>
      <CardHeader>
        <h3 className="usa-card__heading">{heading}</h3>
      </CardHeader>
      <CardMedia exdent>{image && <GatsbyImage image={image} alt="A stock image" />}</CardMedia>
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
