"use client";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Card } from "@/components/ui/card";

interface SplitViewProps {
  pdfUrl: string;
  children: React.ReactNode;
}

export function SplitView({ pdfUrl, children }: SplitViewProps) {
  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-screen">
      <ResizablePanel defaultSize={50}>
        <div className="h-full p-4 bg-muted/20">
          <Card className="h-full overflow-hidden">
            <iframe
              src={`${pdfUrl}#toolbar=1&navpanes=1`}
              className="w-full h-full border-0"
              title="PDF Viewer"
            />
          </Card>
        </div>
      </ResizablePanel>
      
      <ResizableHandle />
      
      <ResizablePanel defaultSize={50}>
        <div className="h-full overflow-auto">
          {children}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}