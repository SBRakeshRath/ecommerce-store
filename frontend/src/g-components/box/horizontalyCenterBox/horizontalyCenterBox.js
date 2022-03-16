import "./horizontalyCenterBox.scss";
import TopScroller from "g-components/animations/topScroller";
export default function HorizontalyCenterBox({ id,animation, children }) {
  return (
    <div className="horizontalyCenterBox" id = {id || ""}>
      <div className="HorizontalyCenterBoxWrapper">
        {animation ? <TopScroller /> : false}
        <main className="HorizontalyCenterBoxMain">{children}</main>
      </div>
    </div>
  );
}
