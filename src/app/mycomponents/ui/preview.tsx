"use client";
import useTextStore from "@/store/textStore";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CustomLink from "../customElements/customLink";
import CustomCode from "../customElements/customeCode";
import CustomListItem from "../customElements/customList";
import CustomUL from "../customElements/customUL";
import CustomP from "../customElements/customP";
import CustomH1 from "../customElements/customH1";
import CustomH2 from "../customElements/customH2";
import CustomH3 from "../customElements/customH3";
import CustomH4 from "../customElements/customH4";

const Preview = () => {
  const text = useTextStore((state) => state.text);
  return (
    <div className="h-full w-full overflow-y-scroll">
      <p className="mx-2 my-2 pb-2 text-sm font-mono font-bold text-primary border-b">
        # Preview of your Markdown
      </p>
      <div className="px-4 ">
        <Markdown
          className="max-w-fit break-words "
          remarkPlugins={[remarkGfm]}
          components={{
            a: CustomLink,
            code: CustomCode,
            ul: CustomUL,
            li: CustomListItem,
            p: CustomP,
            h1: CustomH1,
            h2: CustomH2,
            h3: CustomH3,
            h4: CustomH4,
          }}
        >
          {text}
        </Markdown>
      </div>
    </div>
  );
};

export default Preview;
