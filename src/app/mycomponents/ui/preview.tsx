"use client";
import useTextStore from "@/store/textStore";
import Markdown from "react-markdown";

const Preview = () => {
  const text = useTextStore((state) => state.text);
  return (
    <div className="h-full">
      <p className="mx-2 my-2 pb-2 text-sm font-mono font-bold text-primary border-b">
        # Preview of your Markdown
      </p>
      <div className="px-4 overflow-auto">
        <Markdown>{text}</Markdown>
      </div>
    </div>
  );
};

export default Preview;
