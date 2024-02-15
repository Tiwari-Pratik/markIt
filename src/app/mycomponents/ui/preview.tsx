"use client";
import useTextStore from "@/store/textStore";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CustomLink from "../customElements/customLink";
import CustomCode from "../customElements/customeCode";
import CustomListItem from "../customElements/customList";
import CustomUL from "../customElements/customUL";

const Preview = () => {
  const text = useTextStore((state) => state.text);
  return (
    <div className="h-full">
      <p className="mx-2 my-2 pb-2 text-sm font-mono font-bold text-primary border-b">
        # Preview of your Markdown
      </p>
      <div className="px-4 overflow-auto">
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            a: CustomLink,
            code: CustomCode,
            ul: CustomUL,
            li: CustomListItem,
          }}
        >
          {text}
        </Markdown>
      </div>
    </div>
  );
};

export default Preview;
