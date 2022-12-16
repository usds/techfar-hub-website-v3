import * as React from "react";
import { graphql, useStaticQuery, withPrefix, Link } from "gatsby";
import classNames from "classnames";
import { FaFilePdf, FaFileWord, FaDownload } from "react-icons/fa";

export const Hyperlink = (props: React.HTMLProps<HTMLAnchorElement>): JSX.Element => {
  if (props && "href" in props && props.href) {
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
    let href = props.href;
    let isAbsolute = /^(?:[a-z+]+:)?\/\//i.test(href) || href.startsWith("mailto");
    const siteUrl = site.siteMetadata.siteUrl;
    const url = new URL(href, siteUrl);
    const isDownload = !/(\/|.htm|.html)$/i.test(url.pathname);
    const isPdf = isDownload && /\.pdf$/i.test(url.pathname);
    const isWord = isDownload && /\.docx?$/i.test(url.pathname);
    let children = props.children;
    props = { ...props };
    delete props.children;

    // Fix links that are actually internal but absolute, or to github
    if (isAbsolute) {
      if (href.includes("://techfarhub.cio.gov")) {
        href = href.replace(/https?:\/\/techfarhub\.cio\.gov/i, "");
        isAbsolute = false;
        props = {
          ...props,
          href,
        };
      } else if (/https:\/\/github\.com\/usds\/techfar-hub-website-v3\/.+\/main\/tech-far-hub/i.test(href)) {
        href = href.replace(/https:\/\/github\.com\/usds\/techfar-hub-website-v3\/.+\/main\/tech-far-hub/i, "");
        isAbsolute = false;
        props = {
          ...props,
          href,
        };
      }
    }

    // Decorate external links and links to download files
    const isExternal = isAbsolute && !href.includes(siteUrl);
    if (isExternal) {
      props = { ...props, className: classNames(props.className, "usa-link--external") };
    }
    if (isPdf) {
      children = (
        <>
          {children}
          <FaFilePdf />
        </>
      );
    } else if (isWord) {
      children = (
        <>
          {children}
          <FaFileWord />
        </>
      );
    } else if (isDownload) {
      <>
        {children}
        <FaDownload />
      </>;
    }

    // Absolute URLs get regular links, internal page URLs get gatsby links
    // and file URLs get regular links again. All internal URLs get prefixed
    if (isAbsolute) {
      return <a {...props}>{children}</a>;
    } else {
      props = { ...props, href: withPrefix(href) };
      if (isDownload) {
        return <a {...props}>{children}</a>;
      } else {
        return <Link to={href}>{children}</Link>;
      }
    }
  }
  // Looks like it was an old-school anchor
  return <a {...props}></a>;
};
