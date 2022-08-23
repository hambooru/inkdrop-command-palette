"use babel";

import React, { useEffect, useCallback, useRef, useLayoutEffect } from "react";
import Option from "./command.js";
import Application from "../commands/application.js";
import Core from "../commands/core.js";
import NoteTags from "../commands/notetagsbar.js";
import Formatting from "../commands/formatting.js";
import { logger, useModal } from "inkdrop";
import useArrowKeyNavigation from "../navigation/hook.js";

const CommandPalette = (props) => {
  const Commands = [...Formatting, ...Application, ...Core, ...NoteTags];

  const modal = useModal();
  const { Dialog } = inkdrop.components.classes;

  const inputRef = useRef(null);
  const [searchQuery, setSearchQuery] = React.useState("");

  const toggle = useCallback(() => {
    modal.show();
  }, []);

  useEffect(() => {
    const sub = inkdrop.commands.add(document.body, {
      "commandpalette:toggle": toggle,
    });
    console.log("useeffect triggered");
    return () => sub.dispose();
  }, [toggle]);

  // focus text box when dialog is shown
  useLayoutEffect(() => {
    setTimeout(() => {
      const textbox = document.getElementById("cpInput");
      textbox.focus();
    }, 50);
    console.log("use layout effect triggered");
  });

  const filter = (commands, query) => {
    if (!query) return commands;
    return commands.filter((command) => {
      const commandText = command.name.toLowerCase();
      const commandCat = command.category.toLowerCase();
      let textFilter = commandText.includes(query.toLowerCase());
      let categoryFilter = commandCat.includes(query.toLowerCase());
      return textFilter || categoryFilter;
    });
  };

  const changeHandler = (e) => {
    e.preventDefault();
    setSearchQuery(e.currentTarget.value);
  };

  const filteredResults = filter(Commands, searchQuery);

  return (
    <Dialog
      {...modal.state}
      onBackdropClick={modal.close}
      className="commandpalette flex-col"
    >
      <Dialog.Content className="commandpalette">
        <div
          className="commandpalettewrapper flex-col"
          ref={useArrowKeyNavigation({
            selectors: "a,input",
            modal: modal.close,
          })}
        >
          <div className="flex-col contents">
            <div className="ui small input">
              <input
                type="text"
                placeholder="Search files by name (append > for actions or ! for formatting)"
                spellCheck="false"
                className="cpInput"
                id="cpInput"
                ref={inputRef}
                onChange={changeHandler}
              />
            </div>
            <div className="cpContents">
              {filteredResults.length === 0 ? (
                <div className="nomatch">
                  <p className="nomatchemoji">{"(｡>﹏<)"}</p>
                  <p className="nomatchtext">no matching commands</p>
                  <p className="nomatchtext">
                    try searching for a different term
                  </p>
                </div>
              ) : null}
              {filteredResults.map((Command, index) => {
                return (
                  <Option idx={index} key={index} {...Command} modal={modal} />
                );
              })}
            </div>
          </div>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};

export default CommandPalette;
