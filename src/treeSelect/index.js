import React from "react";
import PropTypes from "prop-types";

import "./styles.css";

export const TreeSelectContainer = ({ children }) => {
  return <div id="nested-List">{children}</div>;
};

const TreeSelect = ({ datas, isRoot }) => {
  return (
    <>
      {datas.map((item, itemIdx) => {
        return (
          <ul key={itemIdx} className={isRoot ? "root" : ""}>
            <li>
              <label>
                <input type="checkbox" />
                {item.name}
              </label>
              {item.children.length > 0 && (
                <div>
                  <TreeSelect datas={item.children} />
                </div>
              )}
            </li>
          </ul>
        );
      })}
    </>
  );
};

TreeSelect.defaultProps = {
  isRoot: false,
};
TreeSelect.propTypes = {
  datas: PropTypes.array.isRequired,
  isRoot: PropTypes.bool,
};

export default TreeSelect;
