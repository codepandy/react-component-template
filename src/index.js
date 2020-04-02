import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styles from "./index.less";
import checkImage from "./assets/check@2x.png";

function TagItem({ value, children, idField, textField, onClick, checked, className, style }) {
  return (
    <div
      className={`${checked ? styles.checked : styles.item} ${className}`}
      onClick={onClick.bind(this, { [idField]: value, [textField]: children })}
      style={style}
    >
      {children}
      {checked ? <img alt="" className={styles.checkImg} src={checkImage} /> : null}
    </div>
  );
}

TagItem.propTypes = {
  item: PropTypes.object,
  idField: PropTypes.string,
  textField: PropTypes.string,
  onClick: PropTypes.func,
  checked: PropTypes.bool,
  className: PropTypes.any,
  style: PropTypes.object,
};

TagItem.defaultProps = {
  onClick: () => {},
  idField: "id",
  textField: "name",
  checked: false,
};

export default class GroupTag extends PureComponent {
  constructor(props) {
    super(props);
    const { isSingle, value } = props;
    let initCheckedItem = [];
    if (Array.isArray(value) && value.length > 0) {
      if (isSingle) {
        initCheckedItem = [value[0]];
      } else {
        initCheckedItem = [...value];
      }
    }
    this.state = {
      checkedItem: initCheckedItem,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;
    if (Array.isArray(value) && value.length > 0) {
      this.setState({ checkedItem: [...value] });
    }
  }

  onClickItem = item => {
    const { onClick, isSingle, idField } = this.props;
    let { checkedItem } = this.state;
    debugger;
    // 单选
    if (isSingle) {
      checkedItem = [item[idField]];
    } else {
      // 多选
      const index = checkedItem.findIndex(ele => ele === item[idField]);
      if (index >= 0) {
        checkedItem.splice(index, 1);
      } else {
        checkedItem.push(item[idField]);
      }
    }

    this.setState({ checkedItem: [...checkedItem] });
    if (typeof onClick === "function") {
      onClick(item);
    }
  };

  render() {
    const { source, idField, textField, className, style, children } = this.props;
    const { checkedItem } = this.state;
    const isIncludes = id => {
      return checkedItem.findIndex(item => item === id) >= 0;
    };
    return (
      <div className={`${styles.container} ${className}`} style={style}>
        {Array.isArray(source) && source.length > 0
          ? source.map(item => (
              <TagItem
                key={item[idField]}
                onClick={this.onClickItem}
                value={item[idField]}
                checked={isIncludes(item[idField])}
                idField={idField}
                textField={textField}
              >
                {item[textField]}
              </TagItem>
            ))
          : React.Children.map(children, item => {
              const { props } = item;
              return (
                <TagItem
                  key={props.value}
                  idField={idField}
                  textField={textField}
                  checked={isIncludes(props.value)}
                  onClick={this.onClickItem}
                  value={props.value}
                >
                  {props.children}
                </TagItem>
              );
            })}
      </div>
    );
  }
}

GroupTag.TagItem = TagItem;

GroupTag.propTypes = {
  defaultValue: PropTypes.any,
  value: PropTypes.array,
  source: PropTypes.array,
  onClick: PropTypes.func,
  isSingle: PropTypes.bool,
  idField: PropTypes.string,
  textField: PropTypes.string,
  className: PropTypes.any,
  style: PropTypes.object,
};

GroupTag.defaultProps = {
  value: [],
  source: [],
  onClick: () => {},
  isSingle: false,
  idField: "id",
  textField: "name",
};
