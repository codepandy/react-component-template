import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styles from "./index.less";

export default class YourComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { className, style, children } = this.props;

    return (
      <div className={`${styles.container} ${className}`} style={style}>
        自定义组件
        {children}
      </div>
    );
  }
}

YourComponent.propTypes = {
  className: PropTypes.any,
  style: PropTypes.object,
};

YourComponent.defaultProps = {};
