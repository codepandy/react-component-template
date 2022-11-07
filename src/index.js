import React from "react";
import styles from "./index.less";
import classNames from "classnames";

export const YourComponent = ({ text, className = "" }) => {
  return (
    <div className={classNames(styles["wenmu-toast"], className)}>{text}</div>
  );
};

export default YourComponent;
