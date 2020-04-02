import React from "react";
import ReactDOM from "react-dom";

import styles from "./index.less";

function Main() {
  return <section>引用组件的地方</section>;
}

ReactDOM.render(<Main />, document.getElementById("root"));
