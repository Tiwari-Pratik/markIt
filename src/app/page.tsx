import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import TextArea from "./mycomponents/ui/textarea";
import Preview from "./mycomponents/ui/preview";

export default function Home() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-w-[90vw] mx-auto mt-20 mb-10 border min-h-[85vh]"
    >
      <ResizablePanel defaultSize={50}>
        <p className="mx-2 my-2 text-sm font-mono font-bold text-primary">
          # Type Your markdown below
        </p>
        <TextArea />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <Preview />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
