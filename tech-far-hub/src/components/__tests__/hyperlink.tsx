import * as React from "react";
import * as Gatsby from "gatsby";
import { render } from "@testing-library/react";
import { vi } from "vitest";
import { Hyperlink } from "../hyperlink";

const useStaticQuery = vi.spyOn(Gatsby, `useStaticQuery`);
const mockUseStaticQuery = {
  site: {
    siteMetadata: {
      siteTitle: `Testing Hyperlinks`,
      siteUrl: `https://example.com`,
    },
  },
};

describe("Hyperlink comonent", () => {
  beforeEach(() => {
    useStaticQuery.mockImplementation(() => mockUseStaticQuery);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("should add a class to extenral links", () => {
    const result = render(<Hyperlink href="https://www.usds.gov">USDS</Hyperlink>).baseElement.firstChild;
    expect(result).toMatchSnapshot();
  });
  it("should prefix and mark internal links for internal page links", () => {
    const result = render(<Hyperlink href="/resources/learning-center/">Learning Center</Hyperlink>).baseElement
      .firstChild;
    expect(result).toMatchSnapshot();
  });

  it("should add an icon to word docs", () => {
    const result = render(<Hyperlink href="/assets/files/word.docx">Word Doc</Hyperlink>).baseElement.firstChild;
    expect(result).toMatchSnapshot();
  });
  it("should add an icon to word pdfs", () => {
    const result = render(<Hyperlink href="/assets/files/professional.pdf">PDF Download</Hyperlink>).baseElement
      .firstChild;
    expect(result).toMatchSnapshot();
  });
});
