import React, { memo } from "react";
import PropTypes from "prop-types";

import "./styles.css";

const Tree = ({ data, isRoot, prevDataPath, handleOnChange }) => {
  return (
    <>
      {data.map((item, itemIdx) => {
        const dataPath = [...prevDataPath];
        dataPath.push(itemIdx);

        return (
          <ul key={itemIdx} className={isRoot ? "root" : ""}>
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={(event) => {
                    dataPath.push("checked");
                    handleOnChange({ dataPath, event });
                  }}
                />
                {item.name}
              </label>
              {item.children.length > 0 && (
                <div>
                  <Tree
                    data={item.children}
                    prevDataPath={[...dataPath, "children"]}
                    handleOnChange={handleOnChange}
                  />
                </div>
              )}
            </li>
          </ul>
        );
      })}
    </>
  );
};
Tree.defaultProps = {
  isRoot: false,
  prevDataPath: [],
};
Tree.propTypes = {
  data: PropTypes.array.isRequired,
  isRoot: PropTypes.bool,
  prevDataPath: PropTypes.array,
  handleOnChange: PropTypes.func.isRequired,
};

const TreeSelect = memo(({ data, handleSelectOnChange }) => {
  return (
    <div id="nested-List">
      <Tree data={data} isRoot handleOnChange={handleSelectOnChange} />
    </div>
  );
});
TreeSelect.propTypes = {
  data: PropTypes.array.isRequired,
  handleSelectOnChange: PropTypes.func.isRequired,
};
export default TreeSelect;
