import { ExtendedRecordMap, PageBlock } from "notion-types";

type TemplateData = Record<string, unknown>;

const arrayIndexReferenceFix = (html: string) => {
  if (!html) html = "";

  let newHtml = html;

  const pattern = /\{\{.+?\}\}/g;
  let subStringArr;
  while ((subStringArr = pattern.exec(html)) !== null) {
    const val = subStringArr[0].split("[").join(".[");
    newHtml = newHtml.replace(subStringArr[0], val);
  }
  return newHtml;
};

const webTemplateEngine = async (
  html: string,
  block?: PageBlock,
  options?: TemplateData[],
) => {
  try {
    const Handlebars = await import("handlebars");
    if (!options) {
      options = [{}];
    }
    let resultHtml = html || JSON.stringify(block) || "";
    resultHtml = arrayIndexReferenceFix(resultHtml);
    const template = Handlebars.compile(
      `
        {{#each this}}
                ${resultHtml}
            {{#unless @last}}splitter{{/unless}}
        {{/each}}
        `,
      { noEscape: true },
    );
    resultHtml = template(options);
    const splittedHtml: string[] | ExtendedRecordMap[] =
      resultHtml.split("splitter");
    if (!html && block) {
      const pageBlocks = splittedHtml.map((splits, index) => {
        let parsedHtml: PageBlock = JSON.parse(splits);
        parsedHtml = {
          ...parsedHtml,
          id: crypto.randomUUID(),
          created_time: Date.now(),
          last_edited_time: Date.now(),
          version: parsedHtml.version + index,
        };
        return parsedHtml;
      });
      return pageBlocks;
    }
    return splittedHtml;
  } catch (error) {
    console.log("Error in template engine", error);
    return null;
  }
};

export { webTemplateEngine };
