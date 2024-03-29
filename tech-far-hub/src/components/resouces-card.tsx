import { Card, CardHeader, CardBody, CardFooter } from "@trussworks/react-uswds";
import { ColumnSizes } from "@trussworks/react-uswds/lib/components/grid/types";
import { Link } from "gatsby";
import * as React from "react";
import _ from "lodash";

interface IResourceNode {
  html: string | null;
  frontmatter: {
    link: string | null;
    heading: string | null;
  } | null;
}

const ResourceCard = ({ node, width = 3 }: { node: IResourceNode; width?: ColumnSizes }): JSX.Element => {
  if (node.html && node.frontmatter && node.frontmatter.link && node.frontmatter.heading) {
    return (
      <Card
        headerFirst
        gridLayout={{ tablet: { col: width } }}
        key={`resource-${_.snakeCase(node.frontmatter.heading)}`}
      >
        <CardHeader>
          <h4>{node.frontmatter.heading}</h4>
        </CardHeader>
        <CardBody dangerouslySetInnerHTML={{ __html: node.html }}></CardBody>
        <CardFooter>
          <Link to={node.frontmatter.link} className="usa-button" aria-label={`View ${node.frontmatter.heading}`}>
            View
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

export default ResourceCard;
