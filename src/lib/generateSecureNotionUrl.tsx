const generateNotionUrl = (url: string, blockId: string) => {
  const encodedS3Url = encodeURIComponent(url);
  const notionImageUrl = `https://www.notion.so/image/${encodedS3Url}?table=block&id=${blockId}&cache=v2`;
  return notionImageUrl;
};

export default generateNotionUrl;
