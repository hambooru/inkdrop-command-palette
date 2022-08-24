"use babel";

import React, { useEffect, useCallback, useRef, useLayoutEffect } from "react";
import Option from "./command.js";
import { useModal } from "inkdrop";
import useArrowKeyNavigation from "../navigation/hook.js";

// commands list
import Application from "../commands/application.js";
import Core from "../commands/core.js";
import NoteTags from "../commands/notetagsbar.js";
import Formatting from "../commands/formatting.js";
import Editor from "../commands/editor.js";
import ExportImport from "../commands/exportimport.js";
import View from "../commands/view.js";
import Window from "../commands/window.js";
import Plugins from "../commands/plugins.js";

const CommandPalette = (props) => {
  const Commands = [
    ...Formatting,
    ...Editor,
    ...Application,
    ...Core,
    ...Plugins,
    ...ExportImport,
    ...View,
    ...Window,
    ...NoteTags,
  ];

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
    return () => sub.dispose();
  }, [toggle]);

  // focus text box when dialog is shown
  useLayoutEffect(() => {
    setTimeout(() => {
      const textbox = document.getElementById("cpInput");
      textbox.focus();
    }, 50);
  });

  const filter = (commands, query) => {
    if (!query) return commands;
    return commands.filter((command) => {
      const normalText = command.name.toLowerCase();
      const commandCat = command.category.toLowerCase();
      const commandAction = command.command.toLowerCase();
      if (command.state === "disabled" || command.state === "notworking")
        return;
      let textFilter = normalText.includes(query.toLowerCase());
      let categoryFilter = commandCat.includes(query.toLowerCase());
      let actionFilter = commandAction.includes(query.toLowerCase());
      return textFilter || categoryFilter || actionFilter;
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
                placeholder="What do you want to do? Tip: . for formatting and > for commands"
                spellCheck="false"
                className="cpInput"
                id="cpInput"
                ref={inputRef}
                onChange={changeHandler}
              />
            </div>
            <div className="cpContents">
              {filteredResults.length === 0 ? (
                <div className="nomatchwrapper">
                  <div className="nomatch">
                    <p className="nomatchemoji">{"(｡>﹏<)"}</p>
                    <p className="nomatchtext">no matching commands</p>
                    <p className="nomatchtext">
                      try searching for a different term
                    </p>
                  </div>

                  <div className="nomatchfooter">
                    <p className="nomatchtext">
                      {" "}
                      have bugs? suggestions? concerns? or just wanna support
                      the plugin?
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      className="nomatchtext"
                    >
                      <a
                        rel="noreferrer noopener"
                        href="https://github.com/fuwaa/inkdrop-command-palette"
                        target="_blank"
                        style={{ margin: "0px 5px" }}
                      >
                        star me on github
                      </a>
                      <a
                        rel="noreferrer noopener"
                        href="https://github.com/fuwaa/inkdrop-command-palette/issues/new"
                        target="_blank"
                        style={{ margin: "0px 5px" }}
                      >
                        report an issue
                      </a>
                    </div>
                  </div>
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
