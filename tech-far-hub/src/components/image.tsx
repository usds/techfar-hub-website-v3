import * as React from "react";
import { graphql, useStaticQuery, withPrefix, Link } from "gatsby";

export const Image = (
  props: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
): JSX.Element => {
  if (props && "src" in props && props.src) {
    const src = props.src;
    const isAbsolute = /^(?:[a-z+]+:)?\/\//i.test(src);
    if (!isAbsolute) {
      props = { ...props, src: withPrefix(src) };
    }
    return <img {...props} />;
  }
  return <img {...props} />;
};
