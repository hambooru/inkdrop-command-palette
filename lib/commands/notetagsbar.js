"use babel";

export default [
  {
    name: "!Unselect items",
    category: "Tags Bar",
    command: "core:note-tags-bar-item-list-unselect",
    selector: ".note-tags-bar-item-list",
    state: "inprogress",
    shortcut: [""],
  },
  {
    name: "!Select previous item",
    category: "Tags Bar",
    command: "core:note-tags-bar-item-list-select-prev",
    selector: ".note-tags-bar-item-list",
    state: "inprogress",
    shortcut: [""],
  },
  {
    name: "!Select next item",
    category: "Tags Bar",
    command: "core:note-tags-bar-item-list-select-next",
    selector: ".note-tags-bar-item-list",
    state: "inprogress",
    shortcut: [""],
  },
  {
    name: "!Remove selected item and select previous item",
    category: "Tags Bar",
    command: "core:note-tags-bar-item-list-select-remove-item-before",
    selector: ".note-tags-bar-item-list",
    state: "inprogress",
    shortcut: [""],
  },
  {
    name: "!Remove selected item",
    category: "Tags Bar",
    command: "core:note-tags-bar-item-list-select-remove-item",
    selector: ".note-tags-bar-item-list",
    state: "inprogress",
    shortcut: [""],
  },
];
