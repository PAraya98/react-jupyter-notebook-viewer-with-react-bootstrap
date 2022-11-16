import React, { useEffect } from "react";

import { vs2015, github } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { NotebookOutputBlockType } from "./types";

import SynaxHighlighter from "react-syntax-highlighter";

const NotebookOutputBlock: React.FC<NotebookOutputBlockType> = (props) => {
    const {
        executionCount,
        data,
        outputType,
        notebookInputLanguage,
        notebookOutputLanguage,
        showOutputLineNumbers,
        outputDarkTheme,
        outputOuterClassName,
        outputTextClassName,
        outputBlockClassName,
        outputTableClassName,
        outputImageClassName,
        outputBorderClassName,
        activeExecutionCount,
        index,
    } = props;

    useEffect(() => {
        document.querySelectorAll("table").forEach((table) => {
            outputTableClassName
                ? outputTableClassName.split(" ").map((className) => table.classList.add(className))
                : table.classList.add(...["tw-min-w-full", "tw-text-right", "tw-table-auto", "tw-mx-auto"]);
        });

        document.querySelectorAll("table thead").forEach((table) => {
            table.classList.add(...["tw-font-bold"]);
            outputDarkTheme
                ? table.classList.add(...["tw-bg-zinc-900", "tw-text-zinc-300"])
                : table.classList.add(...["tw-bg-white", "tw-text-gray-700"]);
        });

        document.querySelectorAll("table thead th").forEach((table) => {
            table.classList.add(...["tw-p-3", "tw-border-b"]);
            outputDarkTheme
                ? table.classList.add(...["tw-border-gray-700"])
                : table.classList.add(...["tw-border-gray-300"]);
        });

        document.querySelectorAll("table tbody").forEach((table) => {
            outputDarkTheme
                ? table.classList.add(...["tw-bg-zinc-900", "tw-text-zinc-300"])
                : table.classList.add(...["tw-bg-white", "tw-text-gray-700"]);
        });

        document.querySelectorAll("table tbody tr").forEach((table) => {
            table.classList.add(...["tw-border-b"]);
            outputDarkTheme
                ? table.classList.add(...["tw-border-gray-700"])
                : table.classList.add(...["tw-border-gray-300"]);
        });

        document.querySelectorAll("table tbody tr td").forEach((table) => {
            table.classList.add(...["tw-py-3", "tw-px-4"]);
        });
    }, [data, outputDarkTheme, outputTableClassName]);

    const renderPlainTextBlock = () => (
        <React.Fragment>
            {data && !Array.isArray(data) && (
                <SynaxHighlighter
                    language={notebookOutputLanguage || notebookInputLanguage}
                    style={outputDarkTheme ? vs2015 : github}
                    showLineNumbers={showOutputLineNumbers}>
                    {data["text/plain"].join("")}
                </SynaxHighlighter>
            )}
        </React.Fragment>
    );

    const renderHtmlTextBlock = () => (
        <React.Fragment>
            {data && !Array.isArray(data) && data["text/html"] && (
                <div
                    className="tw-overflow-x-auto"
                    dangerouslySetInnerHTML={{
                        __html: data["text/html"].join(""),
                    }}
                />
            )}
        </React.Fragment>
    );

    const renderImageBlock = () => (
        <React.Fragment>
            {data && !Array.isArray(data) && data["image/png"] && (
                <img
                    className={outputImageClassName}
                    src={`data:image/png;base64,${data["image/png"]}`}
                    alt=""
                />
            )}
        </React.Fragment>
    );

    const renderStreamBlock = () => (
        <SynaxHighlighter
            language={notebookOutputLanguage || notebookInputLanguage}
            style={outputDarkTheme ? vs2015 : github}
            showLineNumbers={showOutputLineNumbers}>
            {data && Array.isArray(data) ? data.join("") : ""}
        </SynaxHighlighter>
    );

    const renderErrorBlock = () => (
        <SynaxHighlighter
            customStyle={{ backgroundColor: "rgb(239, 68, 68)" }}
            language={notebookOutputLanguage || notebookInputLanguage}
            style={outputDarkTheme ? vs2015 : github}
            showLineNumbers={showOutputLineNumbers}>
            {data && Array.isArray(data) ? data.join("") : ""}
        </SynaxHighlighter>
    );

    return (
        <div
            className={`tw-output-block tw-output-${executionCount} tw-flex tw-w-full tw-py-2 ${
                outputOuterClassName || ""
            } ${
                activeExecutionCount === executionCount
                    ? `tw-border-l-8 ${
                          outputBorderClassName ? outputBorderClassName : "tw-border-blue-400"
                      } tw-my-2 tw-pl-2 md:tw-pl-0`
                    : "tw-border-l-8 tw-border-transparent tw-my-2 tw-pl-2 md:tw-pl-0"
            }`}>
            <p
                className={`tw-output-block-text tw-hidden md:tw-flex md:tw-w-1/6 xl:tw-w-1/12 tw-font-semibold tw-justify-end md:tw-pr-12 xl:tw-pr-6 ${
                    outputTextClassName || ""
                } ${
                    activeExecutionCount === executionCount
                        ? "tw-text-red-500"
                        : outputDarkTheme
                        ? "tw-text-black"
                        : "tw-text-white"
                }
                }`}>
                {index === 0 && <React.Fragment>Out [{executionCount}]:</React.Fragment>}
            </p>
            <div className={`tw-w-full md:tw-w-5/6 xl:tw-w-11/12 ${outputBlockClassName || ""}`}>
                {data &&
                    !Array.isArray(data) &&
                    !data["text/html"] &&
                    data["text/plain"] &&
                    renderPlainTextBlock()}
                {data &&
                    !Array.isArray(data) &&
                    data["text/html"] &&
                    data["text/plain"] &&
                    renderHtmlTextBlock()}
                {data && !Array.isArray(data) && data["image/png"] && renderImageBlock()}
                {outputType === "stream" && renderStreamBlock()}
                {outputType === "error" && renderErrorBlock()}
            </div>
        </div>
    );
};

export { NotebookOutputBlock };
