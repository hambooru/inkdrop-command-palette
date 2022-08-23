"use babel";

import React, { useEffect, useCallback, useLayoutEffect } from "react";
import { ipcRenderer } from "electron";

export default Option = (props) => {
  let { name, category, command, shortcut, modal, idx } = props;

  function execute() {
    ipcRenderer.send("command", command, {});
    modal.close();
    // hide modal after executing
  }

  return (
    <a className="option flex-row" onClick={execute} href="#">
      <p className="nomargin">
        {category}
        {category != "" ? ": " : ""}
        {name.replace(/!/g, "").replace(/>/g, "")}
      </p>
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
