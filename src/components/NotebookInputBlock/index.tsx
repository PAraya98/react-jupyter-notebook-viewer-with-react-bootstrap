import React, { useEffect } from "react";

import { vs2015, github } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { NotebookInputBlockType } from "./types";

import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import SynaxHighlighter from "react-syntax-highlighter";

const RANDOM_INDEX_START_FOR_NULL_EXECUTION_COUNT = 2000000;

const NotebookInputBlock: React.FC<NotebookInputBlockType> = (props) => {
    const {
        type,
        source,
        executionCount,
        notebookInputLanguage,
        inputCodeDarkTheme,
        inputMarkdownDarkTheme,
        showInputLineNumbers,
        inputOuterClassName,
        inputTextClassName,
        inputCodeBlockClassName,
        inputMarkdownBlockClassName,
        inputBorderClassName,
        activeExecutionCount,
        hideCodeBlocks,
        hideMarkdownBlocks,
        remarkPlugins,
        rehypePlugins,
    } = props;

    useEffect(() => {
        document.querySelectorAll(".markdown-block h1").forEach((h1) => {
            h1.classList.add(...["tw-text-3xl", "tw-font-extrabold", "tw-border-b", "tw-pt-3"]);
            inputMarkdownDarkTheme
                ? h1.classList.add(...["tw-border-black"])
                : h1.classList.add(...["tw-border-white"]);
        });

        document.querySelectorAll(".markdown-block h2").forEach((h2) => {
            h2.classList.add(...["tw-text-2xl", "tw-font-bold", "tw-border-b", "tw-pt-2"]);
            inputMarkdownDarkTheme
                ? h2.classList.add(...["tw-border-black"])
                : h2.classList.add(...["tw-border-white"]);
        });

        document.querySelectorAll(".markdown-block h3").forEach((h3) => {
            h3.classList.add(...["tw-text-xl", "tw-font-semibold", "tw-pt-1"]);
        });

        document.querySelectorAll(".markdown-block h4").forEach((h4) => {
            h4.classList.add(...["tw-text-lg", "tw-font-semibold", "tw-pt-1"]);
        });

        document.querySelectorAll(".markdown-block h5").forEach((h5) => {
            h5.classList.add(...["tw-text-lg", "tw-font-semibold", "tw-pt-1"]);
        });

        document.querySelectorAll(".markdown-block h6").forEach((h6) => {
            h6.classList.add(...["tw-text-lg", "tw-font-semibold", "tw-pt-1"]);
        });

        document.querySelectorAll(".markdown-block > p").forEach((p) => {
            p.classList.add(...["tw-py-1"]);
        });

        document.querySelectorAll(".markdown-block a").forEach((a) => {
            a.classList.add(...["visited:tw-text-purple-400", "hover:tw-underline"]);
        });

        document.querySelectorAll(".markdown-block ol").forEach((ol) => {
            ol.classList.add(...["tw-list-decimal", "tw-py-2", "tw-px-10"]);
        });

        document.querySelectorAll(".markdown-block ul").forEach((ul) => {
            ul.classList.add(...["tw-list-disc", "tw-py-2", "tw-px-10"]);
        });

        document.querySelectorAll(".markdown-block blockquote").forEach((blockquote) => {
            blockquote.classList.add(
                ...["tw-py-1", "tw-my-2", "tw-mx-8", "tw-px-5", "tw-border-l-8", "tw-border-gray-400"]
            );
        });

        document.querySelectorAll(".markdown-block code").forEach((code) => {
            code.classList.add(...["tw-bg-zinc-300", "tw-px-2", "tw-rounded-sm"]);
        });

        document.querySelectorAll(".markdown-block pre code").forEach((code) => {
            code.classList.add(
                ...[
                    "tw-block",
                    "tw-bg-transparent",
                    "tw-whitespace-pre-wrap",
                    "tw-overflow-x-auto",
                    "tw-max-w-full",
                    "tw-p-0",
                ]
            );
        });
    }, [source, inputMarkdownDarkTheme]);

    const renderCodeBlock = () => (
        <div
            className={`input-${executionCount} tw-flex tw-w-full tw-py-2 ${inputOuterClassName || ""} ${
                activeExecutionCount === executionCount
                    ? `tw-border-l-8 ${
                          inputBorderClassName ? inputBorderClassName : "tw-border-blue-400"
                      } tw-my-2 tw-pl-2 tw-md:pl-0`
                    : "tw-border-l-8 tw-border-transparent tw-my-2 tw-pl-2 md:tw-pl-0"
            }`}>
            <p
                className={`tw-hidden md:tw-flex md:tw-w-1/6 xl:tw-w-1/12 tw-font-semibold tw-justify-end md:tw-pr-12 xl:tw-pr-6 ${
                    inputTextClassName || ""
                } ${
                    activeExecutionCount === executionCount
                        ? "tw-text-blue-500"
                        : inputCodeDarkTheme
                        ? "tw-text-black"
                        : "tw-text-white"
                }`}>
                In [
                {executionCount < RANDOM_INDEX_START_FOR_NULL_EXECUTION_COUNT
                    ? executionCount
                    : "..."}
                ]:
            </p>
            <div className={`tw-w-full md:tw-w-5/6 xl:tw-w-11/12 ${inputCodeBlockClassName || ""}`}>
                <SynaxHighlighter
                    language={notebookInputLanguage}
                    style={inputCodeDarkTheme ? vs2015 : github}
                    showLineNumbers={showInputLineNumbers}>
                    {source}
                </SynaxHighlighter>
            </div>
        </div>
    );

    const renderMarkdownBlock = () => (
        <div
            className={`input-${executionCount} tw-flex tw-w-full tw-py-2 ${inputOuterClassName || ""} ${
                activeExecutionCount === executionCount
                    ? `tw-border-l-8 ${
                          inputBorderClassName ? inputBorderClassName : "tw-border-blue-400"
                      } tw-my-2 tw-pl-2 md:tw-pl-0`
                    : "tw-border-l-8 tw-border-transparent tw-my-2 tw-pl-2 md:tw-pl-0"
            }`}>
            <div
                className={`tw-hidden md:tw-flex md:tw-w-1/6 xl:tw-w-1/12 tw-font-semibold tw-justify-end md:tw-pr-12 xl:tw-pr-6 ${
                    inputTextClassName || ""
                }`}
            />
            <div
                className={`markdown-block tw-w-full md:tw-w-5/6 xl:tw-w-11/12 ${
                    inputMarkdownBlockClassName || ""
                } ${inputMarkdownDarkTheme ? "tw-text-black" : "tw-text-white"}`}>
                <ReactMarkdown
                    children={source}
                    remarkPlugins={
                        remarkPlugins && remarkPlugins.length > 0
                            ? [...remarkPlugins, [remarkGfm, { singleTilde: false }]]
                            : [[remarkGfm, { singleTilde: false }]]
                    }
                    rehypePlugins={rehypePlugins}
                />
            </div>
        </div>
    );

    return (
        <React.Fragment>
            {type === "code" && !hideCodeBlocks && renderCodeBlock()}
            {type === "markdown" && !hideMarkdownBlocks && renderMarkdownBlock()}
        </React.Fragment>
    );
};

export { NotebookInputBlock };
