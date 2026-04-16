export type ToolLabel = "Free" | "Paid";

export interface Tool {
  name: string;
  category: string;
  label: ToolLabel;
  description: string;
  href: string;
}

export const DESIGN_TOOLS: Tool[] = [
  {
    name: "Adobe Illustrator",
    category: "Vector Design",
    label: "Paid",
    description:
      "The industry standard for vector based design. Ideal for creating logos, icons, server banners, and any graphic that needs to scale cleanly at any size. Vectors stay sharp whether displayed at 16px or 1600px making Illustrator the right tool for brand identity work.",
    href: "https://adobe.com/products/illustrator",
  },
  {
    name: "Adobe Photoshop",
    category: "Photo Editing and Raster Design",
    label: "Paid",
    description:
      "The go-to tool for livery design, texture work, and any design that involves photo manipulation or raster based artwork. If you are building ERLC liveries, custom overlays, or detailed scene compositions, Photoshop is where that work gets done.",
    href: "https://adobe.com/products/photoshop",
  },
];

export const tools: Tool[] = [...DESIGN_TOOLS];
