'use babel';

import WordcountMessageDialog from './wordcount-message-dialog';

module.exports = {

  activate() {
    inkdrop.components.registerClass(WordcountMessageDialog);
    inkdrop.layouts.addComponentToLayout(
      'modal',
      'WordcountMessageDialog'
    )
  },

  deactivate() {
    inkdrop.layouts.removeComponentFromLayout(
      'modal',
      'WordcountMessageDialog'
    )
    inkdrop.components.deleteClass(WordcountMessageDialog);
  }

};
