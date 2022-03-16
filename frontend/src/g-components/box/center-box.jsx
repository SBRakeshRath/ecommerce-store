import "./center-box.scss";
import TopScroller from "g-components/animations/topScroller";

export default function CenterBox(props) {
  const excludeData = ["children", "className", "animation"];

  //dom data
  const data = Object.keys(props)
    .filter((val) => {
      return !excludeData.includes(val);
    })
    .reduce((prev, cur) => {
      prev[cur] = props[cur];
      return prev;
    }, {});

  return (
    <div className="mainContainerWrapper">
      <div className="box-wrapper">
          {props.animation ? <TopScroller /> : false }
        <main className="main-container" {...data}>
          {props.children}
        </main>
      </div>
    </div>
  );
}
