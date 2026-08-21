import { ReactNode, useEffect, useRef } from "react";

interface PhoneFrameProps {
  children: ReactNode;
}

/** Design viewport the app is laid out at, in CSS px (iPhone 14/15 class). */
const DESIGN_WIDTH = 390;

/**
 * Wraps the whole app shell in an iPhone-style device mockup.
 *
 * The app is laid out at a fixed DESIGN_WIDTH viewport and then scaled to fill
 * the device screen, so on a large portrait kiosk it reads as a real phone
 * enlarged — type, spacing and chrome all grow together — rather than a
 * phone-width layout stretched across a wide frame.
 *
 * `.phone-safe` carries a transform, which makes it the containing block for
 * the app's `position: fixed` bars, so they pin inside the phone instead of
 * escaping to the browser viewport and clear the island and home indicator.
 */
const PhoneFrame = ({ children }: PhoneFrameProps) => {
  const screenRef = useRef<HTMLDivElement>(null);
  const scalerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const screen = screenRef.current;
    const scaler = scalerRef.current;
    if (!screen || !scaler) return;

    const applyScale = () => {
      const { width, height } = screen.getBoundingClientRect();
      if (!width || !height) return;

      const scale = width / DESIGN_WIDTH;
      scaler.style.width = `${DESIGN_WIDTH}px`;
      // Height in design px so the scaled result exactly fills the screen.
      scaler.style.height = `${height / scale}px`;
      scaler.style.transform = `scale(${scale})`;
    };

    applyScale();

    const observer = new ResizeObserver(applyScale);
    observer.observe(screen);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="phone-stage">
      <div className="phone-device">
        {/* Side buttons */}
        <span className="phone-button phone-button--silent" />
        <span className="phone-button phone-button--volume-up" />
        <span className="phone-button phone-button--volume-down" />
        <span className="phone-button phone-button--power" />

        <div className="phone-screen" ref={screenRef}>
          <div className="phone-scaler" ref={scalerRef}>
            <div className="phone-safe">
              <div className="phone-viewport">{children}</div>
            </div>

            {/* Device chrome overlays, in design px so they scale too */}
            <div className="phone-island" />
            <div className="phone-home-indicator" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneFrame;
