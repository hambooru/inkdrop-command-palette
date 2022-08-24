"use babel";
export default [
  /*
  {
    name: ".example" (prefix (optional))name
    category: "example category, category
    command: "example:command", action registered on inkdrop
    selector: "body", selector on where it should be invoked
    shortcut: ["ctrl", "k"], (optional but must be listed as empty e.g. [""]) shortcuts separated by keys
    status: (optional) "untested", status of the command, can be untested (needs testing), notworking (buggy) or null (working)
    args: [], (optional) arguments of command" * NOT YET IMPLEMENTED
  },
  */

  {
    name: ">Toggle",
    category: "Command Palette",
    command: "commandpalette:toggle", // invoking commandpalette:toggle here would just open the command palette again
    selector: "body",
    state: "plugin",
    shortcut: ["ctrl", "k"],
  },
];
