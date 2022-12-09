import React from "react";
import { Card, CardMedia, CardHeader, CardBody } from "@trussworks/react-uswds";
import { withPrefix } from "gatsby";
const ExternalResouces = ({
  children,
  media,
  heading,
}: {
  children: React.ReactNode;
  media?: string;
  heading?: string;
}): JSX.Element => {
  const cardMediaUrl = media ? media : "/assets/img/ux-indonesia-8mikJ83LmSQ-unsplash.jpg";
  const cardHeading = heading ? heading : "External resources";
  return (
    <Card layout="flagDefault" headerFirst gridLayout={{ tablet: { col: 12 } }} className="tfh-lifecycleResouces">
      <CardHeader>
        <h3 className="usa-card__heading">{cardHeading}</h3>
      </CardHeader>
      <CardMedia exdent>
        <img src={withPrefix(cardMediaUrl)} alt="A stock image" />
      </CardMedia>
      <div className="tfh-lifecycleResouces-internal">
        <CardBody>{children}</CardBody>
      </div>
    </Card>
  );
};

export default ExternalResouces;
