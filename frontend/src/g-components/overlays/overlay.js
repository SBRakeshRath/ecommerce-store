import "./overlay.scss";
import { useSelector } from "react-redux";
export default function Overlay({ children, disable }) {
  const disableSite = useSelector((state) => state.errorReducer.disableSite);
  return (
    <div className="overlayContainerClass">
      <div className="wrapper">
        {disableSite ? (
          <div
            className="disableContainerClass"
            onClick={(e) => {
              e.stopPropagation();
            }}
          ></div>
        ) : null}
        {children}
      </div>
    </div>
  );
}
