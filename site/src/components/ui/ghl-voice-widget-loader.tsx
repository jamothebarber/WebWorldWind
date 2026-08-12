"use client";

import { useEffect } from "react";

const SCRIPT_SRC = process.env.NEXT_PUBLIC_GHL_VOICE_WIDGET_SCRIPT_SRC;
const WIDGET_ID = process.env.NEXT_PUBLIC_GHL_VOICE_WIDGET_ID;

/**
 * Mounts the GHL Voice AI widget loader script site-wide, once. No-ops
 * entirely when unconfigured so the site behaves identically pre-launch.
 */
export function GhlVoiceWidgetLoader() {
  useEffect(() => {
    if (!SCRIPT_SRC || !WIDGET_ID) return;
    if (document.querySelector(`script[data-ghl-voice-widget]`)) return;

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.setAttribute("data-widget-id", WIDGET_ID);
    script.setAttribute("data-ghl-voice-widget", "true");
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
}
