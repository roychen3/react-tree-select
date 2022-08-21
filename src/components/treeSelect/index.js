import React from "react";
import PropTypes from "prop-types";

import "./styles.css";

const Tree = ({ data, isRoot, prevDataPath, handleChange }) => {
  return (
    <>
      {data.map((item, itemIdx) => {
        const dataPath = [...prevDataPath];
        dataPath.push(itemIdx);

        if (item.display === false) return null;

        return (
          <ul key={itemIdx} className={isRoot ? "root" : ""}>
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={(event) => {
                    dataPath.push("checked");
                    handleChange({ dataPath, event });
                  }}
                />
                {item.name}
              </label>
              {item.children.length > 0 && (
                <div>
                  <Tree
                    data={item.children}
                    prevDataPath={[...dataPath, "children"]}
                    handleChange={handleChange}
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
  handleChange: PropTypes.func.isRequired,
};

const TreeSelect = ({ data, handleSelectChange }) => {
  return (
    <div id="nested-List">
      <Tree data={data} isRoot handleChange={handleSelectChange} />
    </div>
  );
};
TreeSelect.propTypes = {
  data: PropTypes.array.isRequired,
  handleSelectChange: PropTypes.func.isRequired,
};
export default TreeSelect;
