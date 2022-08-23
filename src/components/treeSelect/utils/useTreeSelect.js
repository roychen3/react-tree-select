import { useState } from "react";
import {
  setObjAndAllDisplayChildren,
  setObAllParent,
  setAndCheckAllParent,
  deepSearch,
} from "./utils";

export const useTreeSelect = ({ defaultData }) => {
  const [data, setData] = useState(defaultData);

  const handleSelectChange = ({ dataPath, event }) => {
    const changedData = JSON.parse(JSON.stringify(data));
    const eventChecked = event.target.checked;
    setObjAndAllDisplayChildren(changedData, dataPath, eventChecked);
    if (eventChecked) {
      setObAllParent(changedData, dataPath, true);
    } else {
      setAndCheckAllParent(changedData, dataPath);
    }
    setData(changedData);
  };

  const handleSearch = (keyWord) => {
    const regKeyWord = new RegExp(keyWord);
    const matchedData = deepSearch({ data, regKeyWord });
    setData(matchedData);
  };

  return { data, handleSelectChange, handleSearch };
};
