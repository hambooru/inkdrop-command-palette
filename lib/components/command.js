"use babel";

import React, { useEffect, useCallback, useLayoutEffect } from "react";
import { ipcRenderer } from "electron";

export default Option = (props) => {
  let { name, category, command, shortcut, modal, idx, selector, state, args } =
    props;

  function execute() {
    modal.close();
    setTimeout(() => {
      if (state === "disabled" || state === "notworking") return;

      if (category === "Application") {
        ipcRenderer.send("command", command, {});
      }

      if (selector === "body") {
        inkdrop.commands.dispatch(document.body, command);
      } else {
        inkdrop.commands.dispatch(document.querySelector(selector), command);
      }
    }, 50);
    // hide modal after executing
  }

  const status = {
    color:
      state === "notworking"
        ? "var(--light-red)"
        : state === "untested"
        ? "var(light-yellow)"
        : state === "buggy"
        ? "var(light-red)"
        : state === "disabled"
        ? "var(--disabled-text-color)"
        : state === "plugin"
        ? "var(--light-grey)"
        : null,
  };

  return (
    <a className="option flex-row" onClick={execute} href="#">
      <span>
        <p className="nomargin" style={status}>
          {category}
          {category != "" ? ": " : ""}
          {name.replace(/!/g, "").replace(/>/g, "").replace(/\./g, "")}
        </p>
        <p className="nomargin topresult">
          {state === undefined ? (
            <span className="nomargin topresult" style={status}>
              <em>Invoke {command}.</em>
            </span>
          ) : null}{" "}
          {state === "notworking" ? (
            <span
              className="nomargin topresult"
              style={{ color: "var(--disabled-text-color)" }}
            >
              <em>command palette can't invoke this command properly.</em>
            </span>
          ) : null}{" "}
          {state === "buggy" ? (
            <span className="nomargin topresult" style={status}>
              <em>buggy - {command}</em>
              {""}
            </span>
          ) : null}{" "}
          {state === "untested" ? (
            <span
              className="nomargin topresult"
              style={{ color: "var(--disabled-text-color)" }}
            >
              <em>untested - {command}</em>
            </span>
          ) : null}{" "}
          {state === "disabled" ? (
            <span
              className="nomargin topresult"
              style={{ color: "var(--disabled-text-color)" }}
            >
              <em>
                command palette can't invoke this command because it's private
                or disabled.
              </em>
            </span>
          ) : null}{" "}
          {state === "plugin" ? (
            <span
              className="nomargin topresult"
              style={{ color: "var(--disabled-text-color)" }}
            >
              <em>
                Requires {command.split(":")[0]}: {command}.
              </em>
            </span>
          ) : null}{" "}
        </p>
      </span>
      <p className="nomargin">
        {idx === 0 ? (
          <span className="nomargin topresult">
            <em>top result</em>
          </span>
        ) : null}{" "}
        {shortcut.map((key, index) => {
          if (key == "") return null;
          else
            return (
              <span className="shortcut">
                <kbd key={index}>{key}</kbd>
                {index !== shortcut.length - 1 ? " + " : ""}
              </span>
            );
        })}
      </p>
    </a>
  );
};
