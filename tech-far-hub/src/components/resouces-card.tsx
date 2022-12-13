import { Card, CardHeader, CardBody, CardFooter } from "@trussworks/react-uswds";
import { ColumnSizes } from "@trussworks/react-uswds/lib/components/grid/types";
import { Link } from "gatsby";
import * as React from "react";

interface IResourceNode {
  html: string | null;
  frontmatter: {
    href: string | null;
    heading: string | null;
  } | null;
}

const ResouceCard = ({ node, width = 3 }: { node: IResourceNode; width?: ColumnSizes }): JSX.Element => {
  if (node.html && node.frontmatter && node.frontmatter.href) {
    return (
      <Card headerFirst gridLayout={{ tablet: { col: width } }}>
        <CardHeader>
          <h4>{node.frontmatter.heading}</h4>
        </CardHeader>
        <CardBody dangerouslySetInnerHTML={{ __html: node.html }}></CardBody>
        <CardFooter>
          <Link to={node.frontmatter.href} className="usa-button">
            See More
          </Link>
        </CardFooter>
      </Card>
    );
  } else {
    return (
      <Card headerFirst>
        <CardHeader>ERROR in Resouces Snippet</CardHeader>
      </Card>
    );
  }
};

export default ResouceCard;
