import React from "react";
import { createRoot } from "react-dom/client";
import YourComponent from "../index";
import styles from "./index.less";
import icon from "./icon.png";

function Icon() {
  return <img src={icon} alt="" className={styles.icon} />;
}
function Main() {
  const onClick = () => {};
  return (
    <section onClick={onClick}>
      <YourComponent text="hello" />
    </section>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<Main />);
