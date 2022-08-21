import { useState } from "react";
import {
  setObjAndAllChildren,
  setObAllParent,
  setAndCheckAllParent,
  deepSearch,
  deepCheckObj,
} from "./utils";

export const useTreeSelect = ({ defaultData }) => {
  const [data, setData] = useState(defaultData);

  const handleSelectChange = ({ dataPath, event }) => {
    const changedData = JSON.parse(JSON.stringify(data));
    const eventChecked = event.target.checked;
    setObjAndAllChildren(changedData, dataPath, eventChecked);
    if (eventChecked) {
      setObAllParent(changedData, dataPath, true);
    } else {
      setAndCheckAllParent(changedData, dataPath);
    }
    setData(changedData);
  };

  const handleSearch = (keyWord) => {
    const regKeyWord = new RegExp(keyWord);
    const changedData = deepSearch({ data, regKeyWord });
    const checkedData = deepCheckObj(changedData);
    setData(checkedData);
  };

  return { data, handleSelectChange, handleSearch };
};
