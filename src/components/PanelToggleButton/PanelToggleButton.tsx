import { HamburgerButtonDefaultLabel } from "../../common/sharedStrings";
import "./PanelToggleButton.css";
interface PanelToggleButtonProps {
  readonly onButtonClick: () => void;
  readonly buttonLabel?: string;
}

const PanelToggleButton = ({ onButtonClick,buttonLabel }: PanelToggleButtonProps) => {
  const hamburgerButtonText = buttonLabel || HamburgerButtonDefaultLabel;
  return (
    <div
      className="hamburger-icon"
      title={hamburgerButtonText}
      aria-label={hamburgerButtonText}
      onClick={onButtonClick}
    >
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
    </div>
  );
};

export default PanelToggleButton;
