import * as React from "react";
import { SummaryBox, SummaryBoxContent, SummaryBoxHeading } from "@trussworks/react-uswds";

export const Summary = ({ children, heading }: { children: React.ReactNode; heading?: string }): JSX.Element => {
  heading = heading ? heading : "Summary";
  return (
    <SummaryBox>
      <SummaryBoxHeading headingLevel="h3">{heading}</SummaryBoxHeading>
      <SummaryBoxContent>{children}</SummaryBoxContent>
    </SummaryBox>
  );
};
