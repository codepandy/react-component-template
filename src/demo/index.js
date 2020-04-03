import React from "react";
import ReactDOM from "react-dom";
import YourComponent from "../index";
import styles from "./index.less";

function Main() {
  return (
    <section>
      <YourComponent />
    </section>
  );
}

ReactDOM.render(<Main />, document.getElementById("root"));
