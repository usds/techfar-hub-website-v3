import * as React from "react";
import { graphql, useStaticQuery, withPrefix } from "gatsby";
import { URLInfo } from "../url-utils";

export const Image = (
  props: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
): JSX.Element => {
  if (props && "src" in props && props.src) {
    const { site } = useStaticQuery(
      graphql`
        query {
          site {
            siteMetadata {
              siteUrl
            }
          }
        }
      `
    );
    const siteUrl = site.siteMetadata.siteUrl;
    const src = new URLInfo(props.src, siteUrl);

    if (!src.isAbsolute) {
      props = { ...props, src: withPrefix(src.authoritative) };
    }
    return <img {...props} />;
  }
  return <img {...props} />;
};
