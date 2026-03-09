import React, { useEffect, useState } from "react";
import { store } from "../../services/state.js";
import { JarvisCore } from "./JarvisCore";
import { JarvisMode } from "./jarvisCoreConfig";

export const JarvisOrbWrapper = () => {
  const [orbStatus, setOrbStatus] = useState<JarvisMode>("idle");

  useEffect(() => {
    const unsub = store.subscribe((state: any) => {
      setOrbStatus((state.orbStatus || "idle") as JarvisMode);
    });
    return () => {
      unsub();
    };
  }, []);

  return <JarvisCore mode={orbStatus} audioLevel={0} size={540} />;
};
