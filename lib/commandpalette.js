"use babel";

import CommandPalette from "./components/palette";

module.exports = {
  activate() {
    inkdrop.components.registerClass(CommandPalette);
    inkdrop.layouts.addComponentToLayout("modal", "CommandPalette");
  },

  deactivate() {
    inkdrop.layouts.removeComponentFromLayout("modal", "CommandPalette");
    inkdrop.components.deleteClass(CommandPalette);
  },
};
