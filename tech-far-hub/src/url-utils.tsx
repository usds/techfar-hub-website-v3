import { IURLInfo, DownloadFileType } from "./types";

export class URLInfo implements IURLInfo {
  readonly original: string;
  #siteUrl: string;

  constructor(url: string, siteUrl: string) {
    this.original = url;
    this.#siteUrl = siteUrl;
  }

  isUrlAboslute(url: string): boolean {
    return /^(?:[a-z+]+:)?\/\//i.test(url) || url.startsWith("mailto");
  }

  get originalIsAbsolute(): boolean {
    return this.isUrlAboslute(this.original);
  }

  get authoritative(): string {
    if (this.originalIsAbsolute) {
      if (this.original.includes("://techfarhub.cio.gov")) {
        return this.original.replace(/https?:\/\/techfarhub\.cio\.gov/i, "");
      } else if (this.original.includes("://techfarhub.usds.gov")) {
        return this.original.replace(/https?:\/\/techfarhub\.usds\.gov/i, "");
      }
    }
    return this.original;
  }

  get #authoritativeUrl(): URL {
    return new URL(this.authoritative, this.#siteUrl);
  }

  get isAbsolute(): boolean {
    return this.isUrlAboslute(this.authoritative);
  }

  get isDownload(): boolean {
    return !/(\/|.htm|.html)$/i.test(this.#authoritativeUrl.pathname);
  }

  get fileType(): DownloadFileType | null {
    if (this.isDownload) {
      if (/\.pdf$/i.test(this.#authoritativeUrl.pathname)) {
        return DownloadFileType.Pdf;
      } else if (/\.docx?$/i.test(this.#authoritativeUrl.pathname)) {
        return DownloadFileType.Word;
      } else {
        return DownloadFileType.Other;
      }
    }
    return null;
  }

  get isExternal(): boolean {
    return this.isAbsolute && !this.authoritative.includes(this.#siteUrl);
  }
}
