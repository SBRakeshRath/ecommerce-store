import "./style.scss";

export default function TextBorder({ text }) {
  return (
    <div className="text-border">
      <div className="wrapper">
        <div className="border"></div>
        <p>{text}</p>
      </div>
    </div>
  );
}
