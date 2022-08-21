import React from "react";

import SearchBar from "./components/searchBar";

import TreeSelect from "./components/treeSelect";
import { useTreeSelect } from "./components/treeSelect/utils";
// import treeData from "./components/treeSelect/mockData/treeData.json";
import demoData from "./components/treeSelect/mockData/demoData.json";

function App() {
  const { data, handleSelectChange, handleSearch } = useTreeSelect({
    defaultData: demoData,
  });

  return (
    <>
      <SearchBar handleSearch={handleSearch} />
      <TreeSelect data={data} handleSelectChange={handleSelectChange} />
    </>
  );
}

export default App;
