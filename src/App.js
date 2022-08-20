import React, { useState, useCallback } from "react";

import TreeSelect from "./components/treeSelect";
import { useTreeSelect } from "./components/treeSelect/utils";
import treeData from "./components/treeSelect/treeData.json";

function App() {
  const { data, handleSelectOnChange } = useTreeSelect({
    defaultData: treeData,
  });

  return (
    <TreeSelect
      data={data}
      handleSelectOnChange={handleSelectOnChange}
    />
  );
}

export default App;
