import "./topscroller.scss";
import { useRef, useEffect, useState } from "react";

export default function TopScroller(bool) {
  const scroll = useRef(null);

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const [list, setList] = useState([
    ["red", 0],
    ["yellow", 0],
    ["blue", 0],
  ]);

  useEffect(() => {
    const speed = 400;
    async function scrollFunc() {
      const child = scroll.current.children;
      Array.prototype.forEach.call(child, (child) => {
        child.style.transition = "transform " + speed + "ms ease-in-out";
        child.style.transform = "translateX(-100%)";
      });
      child[0].ontransitionend = () => {
        Array.prototype.forEach.call(child, (child) => {
          child.style.transition = "transform 0ms ease-in-out";
          child.style.transform = "translateX(0%)";
        });
        setList((prev) => {
          const c = getRandomColor();
          const newArr = [
            [list[1][0], list[1][1]],
            [list[2][0], list[2][1]],
            [c, 0],
          ];
          return newArr;
        });
      };
    }
    const interval = setInterval(scrollFunc, speed);

    return () => {
      clearInterval(interval);
    };
  }, [list]);

  return (
    <div className="animator">
      <div className="scroll" ref={scroll}>
        {list.map((el) => {
          return (
            <div
              style={{
                backgroundColor: el[0],
              }}
              key={el}
            ></div>
          );
        })}
      </div>
      <div className="shadow"></div>
      {/* <button onClick={clicked}>Click me</button> */}
    </div>
  );
}
