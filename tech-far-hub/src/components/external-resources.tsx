import React from "react";
import { Card, CardMedia, CardHeader, CardBody } from "@trussworks/react-uswds";
import { withPrefix } from "gatsby";
const ExternalResouces = ({
  children,
  media = "/assets/img/ux-indonesia-8mikJ83LmSQ-unsplash.jpg",
  media_alt = "A stock image",
  heading = "External resources",
}: {
  children: React.ReactNode;
  media: string;
  media_alt: string;
  heading: string;
}): JSX.Element => {
  return (
    <Card layout="flagDefault" headerFirst gridLayout={{ tablet: { col: 12 } }} className="tfh-lifecycleResouces">
      <CardHeader>
        <h3 className="usa-card__heading">{heading}</h3>
      </CardHeader>
      <CardMedia exdent>
        <img src={withPrefix(media)} alt={media_alt} />
      </CardMedia>
      <div className="tfh-lifecycleResouces-internal">
        <CardBody>{children}</CardBody>
      </div>
    </Card>
  );
};

export default ExternalResouces;
