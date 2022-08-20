import TreeSelect, { TreeSelectContainer } from "./treeSelect";

import datas from "./treeData.json";

function App() {
  return (
    <TreeSelectContainer>
      <TreeSelect datas={datas} isRoot />
    </TreeSelectContainer>
  );
}

export default App;
