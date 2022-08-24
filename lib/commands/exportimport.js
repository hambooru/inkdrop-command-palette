"use babel";
export default [
  {
    name: ">Export as HTML",
    category: "Export",
    command: "export-as-html:export",
    selector: "body",
    state: "notworking",
    shortcut: [""],
  },
  {
    name: ">Export as Markdown (all)",
    category: "Export",
    command: "export-as-markdown:all",
    selector: "body",
    shortcut: [""],
  },
  {
    name: ">Export as Markdown (Single)",
    category: "Export",
    command: "export-as-markdown:single",
    selector: "body",
    state: "notworking",
    shortcut: [""],
  },
  {
    name: ">Export as PDF",
    category: "Export",
    command: "export-print:export-as-pdf",
    selector: "body",
    shortcut: [""],
  },
  {
    name: ">Print",
    category: "Export",
    command: "export-print:print",
    selector: "body",
    shortcut: ["ctrl", "shft", "p"],
  },
  {
    name: ">Import from file",
    category: "Import",
    command: "import-html:import-from-file",
    selector: "body",
    shortcut: [""],
  },
];
