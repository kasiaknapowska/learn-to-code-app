import { useState, useEffect } from "react";
import classNames from "classnames";

import { getProtips } from "../lib/func-firebase";

import iconProtip from "../../images/icon-bulb.svg";
import iconClose from "../../images/icon-close.svg";

export default function Protip() {
  const [protip, setProtip] = useState("");
  const [closeProtip, setCloseProtip] = useState(false);

  useEffect(() => {
    getProtips((response) => {
      const randomTip = Math.floor(Math.random() * response.docs.length);
      const tipsFromFirebase = response.docs.map((doc) => ({
        tip: doc.data().tip,
        id: doc.id,
      }));
      setProtip(tipsFromFirebase[randomTip]);
    });
  }, []);

  return (
    <>
      {protip && (
        <aside className={classNames("protip", { close: closeProtip })}>
          <img
            className="close_icon"
            alt="close"
            src={iconClose}
            onClick={() => setCloseProtip(true)}
          />
          <img className="protip_icon" alt="protip" src={iconProtip} />
          <h4>JS protip</h4>
          <p>{protip.tip}</p>
          <button className="primary_btn" onClick={() => setCloseProtip(true)}>
            Got it
          </button>
        </aside>
      )}
    </>
  );
}
