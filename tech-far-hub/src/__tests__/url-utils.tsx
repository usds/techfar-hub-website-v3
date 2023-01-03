import { URLInfo } from "../url-utils";
import { DownloadFileType } from "../types";

const site = "http://techfarhub.usds.gov/";
describe("URLInfo Class", () => {
  it("returns absolute URLs as their own authoritative URLs", () => {
    const inURL = "https://www.usds.gov/";
    const info = new URLInfo(inURL, site);
    expect(info.authoritative).toEqual(inURL);
  });

  it("strips techfarhub.cio.gov from URLs", () => {
    const info = new URLInfo("https://techfarhub.cio.gov/handbook/", site);
    expect(info.authoritative).toEqual("/handbook/");
  });
  it("strips techfarhub.usds.gov from URLs", () => {
    const info = new URLInfo("https://techfarhub.usds.gov/handbook/", site);
    expect(info.authoritative).toEqual("/handbook/");
  });
  it("idenifies download files as such", () => {
    const info = new URLInfo("/assets/file/download.pdf", site);
    expect(info.isDownload).toBe(true);
    const nonFileInfo = new URLInfo("/pre-solicitation/", site);
    expect(nonFileInfo.isDownload).toBe(false);
  });
  it("idenifies pdf file types", () => {
    const info = new URLInfo("/assets/file/download.pdf", site);
    expect(info.fileType).toBe(DownloadFileType.Pdf);
  });
  it("idenifies word file types", () => {
    const info = new URLInfo("/assets/file/download.doc", site);
    expect(info.fileType).toBe(DownloadFileType.Word);
  });
  it("idenifies excel file types", () => {
    const info = new URLInfo("/assets/file/download.xlsx", site);
    expect(info.fileType).toBe(DownloadFileType.Excel);
  });
  it("identifies internal vs external URLs", () => {
    const internalInfo = new URLInfo("/resources/learning-center", site);
    expect(internalInfo.isExternal).toBe(false);
    const externalInfo = new URLInfo("https://www.usa.gov/federal-agencies/", site);
    expect(externalInfo.isExternal).toBe(true);
  });
});
