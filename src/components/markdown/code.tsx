import { useEffect, useState } from "react";
import { useTheme } from "@/components/providers/theme-provider";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import styles from "@/styles/code.module.css";

export interface CodeProps {
  codeMarkdown: string;
}

const Code = ({ codeMarkdown }: CodeProps) => {
  const { theme } = useTheme();
  const [codeHtml, setCodeHtml] = useState("");

  useEffect(() => {
    const highlightCode = async () => {
      let selectedTheme = "";

      if (theme === "system") {
        selectedTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
      } else {
        selectedTheme = theme;
      }

      const html = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypePrettyCode, {
          keepBackground: false,
          theme:
            selectedTheme === "dark"
              ? "github-dark-default"
              : "github-light-default",
          transformers: [
            transformerCopyButton({
              visibility: "hover",
              feedbackDuration: 3_000,
            }),
          ],
        })
        .use(rehypeStringify)
        .process(codeMarkdown);

      setCodeHtml(String(html));
    };

    highlightCode();
  }, [codeMarkdown, theme]);

  return (
    <section
      style={styles}
      className="h-full w-full flex-1 rounded border bg-gray-100 p-4 dark:bg-[#171823]"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Still debating if this is a good idea - MY23-1
      dangerouslySetInnerHTML={{ __html: codeHtml }}
    />
  );
};

export { Code };
