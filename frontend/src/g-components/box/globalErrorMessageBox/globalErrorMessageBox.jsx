import "./globalErrorMessageBox.scss";
import { useSelector ,useDispatch} from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import error from "redux_local/actions/error";

export default function GlobalErrorMessageBox() {
  const errorDetails = useSelector((state) => state.errorReducer);
  const dispatch = useDispatch ()

  if (!errorDetails.showErrorMessage) {
    return null;
  }
  const closeMessageBox = ()=>{
    dispatch(error.showErrorMessage(false))
  }
  return (
    <div className="globalErrorMessageBox">
      <div className="wrapper">
        <div className="status">{errorDetails.status}</div>
        <div className="message">{errorDetails.msg}</div>
        {errorDetails.button ? (
          <div className="button">{errorDetails.button}</div>
        ) : null}
        <div className="closeButton" onClick={closeMessageBox}>
          <CloseIcon />
        </div>
      </div>
    </div>
  );
}
