import { useEffect, useState } from "react";

/**
 * Radix portals render into document.body by default, which would place
 * overlays outside the phone frame and let them cover the whole browser
 * window. `.phone-safe` carries a transform, so it is the containing block
 * for the fixed-position overlays — portalling into it keeps dialogs,
 * drawers, sheets and menus inside the device.
 *
 * Returns undefined until mounted (and if the frame is absent), which is
 * exactly what Radix treats as "use the default container".
 */
export function usePortalContainer(): HTMLElement | undefined {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setContainer(document.querySelector<HTMLElement>(".phone-safe"));
  }, []);

  return container ?? undefined;
}
