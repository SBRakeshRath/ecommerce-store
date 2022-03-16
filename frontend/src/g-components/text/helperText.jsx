import "./helperText.scss";
import ErrorIcon from "@mui/icons-material/Error";
export default function HelperText(props) {
  let icon = false;
  switch (props.variant) {
    case "err":
      icon = <ErrorIcon />;
      break;

    default:
      break;
  }

  return (
    <span className="customHelperText">
      <span className="icon">{icon}</span>
      <span className="text">{props.text}</span>
    </span>
  );
}
