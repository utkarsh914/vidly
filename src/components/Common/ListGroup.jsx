import React from "react";

const ListGroup = (props) => {
  const {
    items,
    textProperty,
    valueProperty,
    selectedItem,
    onItemSelect,
  } = props;

  return (
    <ul className="list-group">
      {items.map((item) => {
        let listClasses = "list-group-item clickable";
        if (item === selectedItem) listClasses += " active";
        // highlight all genres by default
        if (!selectedItem && item === items[0]) listClasses += " active";
        return (
          <li
            key={item[valueProperty]}
            className={listClasses}
            onClick={() => onItemSelect(item)}
          >
            {item[textProperty]}
          </li>
        );
      })}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
