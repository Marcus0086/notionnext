import prisma from "@/lib/prisma";

const DesignCodeSettings = async ({
  siteId,
  css,
  html,
  javascript,
}: {
  siteId: string;
  css?: string;
  html?: string;
  javascript?: string;
}) => {
  const result = await prisma.site.update({
    where: {
      id: siteId,
    },
    data: {
      css: css,
      html: html,
      javascript: javascript,
    },
    select: {
      css: true,
      html: true,
      javascript: true,
    },
  });
  return result;
};

const DesignSettings = {
  code: DesignCodeSettings,
};

export { DesignSettings };
