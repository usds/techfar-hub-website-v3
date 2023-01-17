import * as React from "react";
import { graphql, useStaticQuery, withPrefix, Link } from "gatsby";
import classNames from "classnames";
import { FaFilePdf, FaFileExcel, FaFileWord, FaDownload } from "react-icons/fa";
import { URLInfo } from "../url-utils";
import { DownloadFileType } from "../types";

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
    const siteUrl = site.siteMetadata.siteUrl;
    const href = new URLInfo(props.href, siteUrl);
    props = { ...props };
    let children = props.children;
    delete props.children;
    props = {
      ...props,
      href: href.authoritative,
    };
    // Decorate external links and links to download files
    if (href.isExternal) {
      props = { ...props, className: classNames(props.className, "usa-link--external") };
    }
    if (href.isDownload) {
      if (href.fileType === DownloadFileType.Pdf) {
        children = (
          <>
            {children}
            <FaFilePdf />
          </>
        );
      } else if (href.fileType === DownloadFileType.Word) {
        children = (
          <>
            {children}
            <FaFileWord />
          </>
        );
      } else if (href.fileType === DownloadFileType.Excel) {
        children = (
          <>
            {children}
            <FaFileExcel />
          </>
        );
      } else {
        <>
          {children}
          <FaDownload />
        </>;
      }
    }
    // Absolute URLs get regular links, internal page URLs get gatsby links
    // and file URLs get regular links again. All internal URLs get prefixed
    if (href.isAbsolute) {
      return <a {...props}>{children}</a>;
    } else {
      if (href.isDownload) {
        if (process.env.DEPLOY_PREFIX && !href.authoritative.includes(process.env.DEPLOY_PREFIX)) {
          props = { ...props, href: withPrefix(href.authoritative) };
        }
        return <a {...props}>{children}</a>;
      } else {
        return (
          <Link to={href.authoritative} className={props.className}>
            {children}
          </Link>
        );
      }
    }
  }
  // Looks like it was an old-school anchor
  return <a {...props}></a>;
};
