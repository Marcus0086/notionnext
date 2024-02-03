import { ExtendedRecordMap } from "notion-types";
import { getBlockTitle } from "notion-utils";

type BlockContent = {
  text: string;
  pdfs: string[];
};

const getBlockContent = (recordMap?: ExtendedRecordMap): BlockContent => {
  let blockContent: BlockContent = {
    text: "",
    pdfs: [],
  };
  const keys = Object.keys(recordMap?.block || {});
  for (let i = 0; i < keys.length; i++) {
    const block = recordMap?.block?.[keys[i]]?.value;
    if (block) {
      if (block.type === "drive") {
        const pdfs = block.properties.source.reduce((acc, cur) => {
          acc.push(cur[0]);
          return acc;
        }, []);
        blockContent.pdfs = pdfs;
      } else {
        if (blockContent.text.length > 0) {
          blockContent.text += "\n";
        }
        blockContent.text += getBlockTitle(block, recordMap);
      }
    }
  }
  return blockContent;
};

export { getBlockContent };
