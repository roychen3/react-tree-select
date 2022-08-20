import { useState } from "react";
import { getChangedData } from "./utils";

export const useTreeSelect = ({ defaultData }) => {
  const [data, setData] = useState(defaultData);

  const handleSelectOnChange = ({ dataPath, event }) => {
    const changedData = getChangedData({
      data,
      dataPath,
      eventChecked: event.target.checked,
    });
    setData(changedData);
  };

  return { data, handleSelectOnChange };
};
