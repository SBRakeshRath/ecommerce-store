import CancelIcon from "@mui/icons-material/Cancel";
import "./box1.scss";
import { useRef, useLayoutEffect } from "react";
export default function SmallMessageBox1(props) {
  const cont = useRef(null);

  useLayoutEffect(() => {
    if (!props.variant) return;
    if (cont.current == null) return;

    const container = cont.current;

    cont.current.style.display = "flex";


    // remove class
    const extraClass = ["small-box-one-cont-suc", "small-box-one-cont-err"];
    extraClass.forEach((val) => {
      container.classList.remove(val);
    });
    switch (props.variant) {
      case "suc":
        container.classList.add("small-box-one-cont-suc");
        break;
      case "err":
        container.classList.add("small-box-one-cont-err");
        break;
      default:
        container.classList.add("small-box-one-cont-default");
        break;
    }
  });

  const iconClick = () => {
    if (cont.current == null) return;
    cont.current.style.display = "none";
  };

  return (
    <div className="small-box-one-cont" ref={cont}>
      <div className="text">{props.message}</div>
      <div className="icon" onClick={iconClick}>
        <CancelIcon />
      </div>
    </div>
  );
}
