"use babel";

import React, { useEffect, useCallback, useLayoutEffect } from "react";
import { ipcRenderer } from "electron";

export default Option = (props) => {
  let { name, category, command, shortcut, modal, idx, selector, state, args } =
    props;

  function execute() {
    modal.close();
    if (category === "Application") {
      ipcRenderer.send("command", command, {});
    }

    if (category === "Core") {
      if (selector === "body") {
        inkdrop.commands.dispatch(document.body, command);
      } else {
        inkdrop.commands.dispatch(document.querySelector(selector), command);
      }
    }
    // hide modal after executing
  }

  const status = {
    color:
      state === "error"
        ? "#b86a85"
        : state === "inprogress"
        ? "#b7b86a"
        : state === "disabled"
        ? "var(--disabled-text-color)"
        : null,
  };

  return (
    <a className="option flex-row" onClick={execute} href="#">
      <p className="nomargin" style={status}>
        {category}
        {category != "" ? ": " : ""}
        {name.replace(/!/g, "").replace(/>/g, "").replace(/\./g, "")}
      </p>
      <p className="nomargin">
        {idx === 0 ? (
          <span className="nomargin topresult">
            <em>top result</em>
          </span>
        ) : null}{" "}
        {state === "error" ? (
          <span className="nomargin topresult">
            <em>not working / buggy</em>
          </span>
        ) : null}{" "}
        {state === "inprogress" ? (
          <span className="nomargin topresult">
            <em>untested / unimplemented</em>
          </span>
        ) : null}{" "}
        {state === "disabled" ? (
          <span className="nomargin topresult">
            <em>private command </em>
          </span>
        ) : null}{" "}
        {shortcut.map((key, index) => {
          if (key == "") return null;
          else
            return (
              <span>
                <kbd key={index}>{key}</kbd>
                {index !== shortcut.length - 1 ? " + " : ""}
                {console.log(key)}
              </span>
            );
        })}
      </p>
    </a>
  );
};
