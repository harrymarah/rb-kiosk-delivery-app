import { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
}

/**
 * Wraps the whole app shell in an iPhone-style device mockup.
 *
 * `.phone-safe` carries a transform, which makes it the containing block for
 * the app's `position: fixed` bars — so they stay pinned inside the phone
 * instead of escaping to the browser viewport, and clear the dynamic island
 * and home indicator.
 */
const PhoneFrame = ({ children }: PhoneFrameProps) => {
  return (
    <div className="phone-stage">
      <div className="phone-device">
        {/* Side buttons */}
        <span className="phone-button phone-button--silent" />
        <span className="phone-button phone-button--volume-up" />
        <span className="phone-button phone-button--volume-down" />
        <span className="phone-button phone-button--power" />

        <div className="phone-screen">
          <div className="phone-safe">
            <div className="phone-viewport">{children}</div>
          </div>

          {/* Device chrome overlays */}
          <div className="phone-island" />
          <div className="phone-home-indicator" />
        </div>
      </div>
    </div>
  );
};

export default PhoneFrame;
