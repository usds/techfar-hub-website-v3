import figlet from "figlet";
import { Command, Option } from "commander";
import { getBasicTemplate } from "./template-basic";
import { PageKind, PageLocations } from "./constants";
import _ from "lodash";
import * as fs from "fs";
import path from "path";

const program = new Command();
program
  .version("1.0.0")
  .description("A simple CLI for adding pages to our static site")
  .addOption(new Option("-k, --kind <kind>", "Page kind").choices(Array.from(PageKind.keys())).makeOptionMandatory())
  .requiredOption("-h, --heading <heading>", "Page heading (used as the title tag by default, too)")
  .addOption(
    new Option("-p, --parent <parent>", "Parent diretory for the page")
      .choices(Array.from(PageLocations.keys()))
      .makeOptionMandatory()
  )
  .name("clicms")
  .action(({ kind, heading, parent }: { kind: string; heading: string; parent: string }): void => {
    const pageLocation = PageLocations.get(parent) || "";

    const slug = _.kebabCase(heading.toLowerCase());
    const filePath = path.resolve(__dirname, "../../", "tech-far-hub", "content", pageLocation, `${slug}.mdx`);
    const pageContent = getBasicTemplate(heading, PageKind.get(kind) || "default", slug, kind);
    fs.writeFileSync(filePath, pageContent);
    process.stdout.write(filePath);
  })
  .parse(process.argv);

const options = program.opts();
