"use babel";

import React, { useEffect, useCallback, useRef, useLayoutEffect } from "react";
import { logger, useModal } from "inkdrop";

const CommandPalette = (props) => {
  const modal = useModal();
  const { Dialog } = inkdrop.components.classes;

  const searchRef = useRef(null);

  const toggle = useCallback(() => {
    modal.show();
    logger.debug("Dialog was toggled!");
  }, []);

  useEffect(() => {
    const sub = inkdrop.commands.add(document.body, {
      "commandpalette:toggle": toggle,
    });
    return () => sub.dispose();
  }, [toggle]);

  useLayoutEffect(() => {
    document
      .getElementById("cpInput")
      .addEventListener("visibilitychange", onVisibilityChange);

    return () =>
      document
        .getElementById("cpInput")
        .removeEventListener("visibilitychange", onVisibilityChange);
  });

  const onVisibilityChange = () => {
    if (element.classList.contains("visible")) {
      document.getElementById("cpInput").focus();
    }
  };

  return (
    <Dialog {...modal.state} onBackdropClick={modal.close}>
      <Dialog.Content className="commandpalette">
        <div role="dialog" aria-modal="true">
          <div>
            <div className="ui small input">
              <input
                type="text"
                placeholder="Search files by name (append > for actions or ! for formatting)"
                spellCheck="false"
                className="cpInput"
                id="cpInput"
                ref={searchRef}
              />
            </div>
          </div>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};

export default CommandPalette;
