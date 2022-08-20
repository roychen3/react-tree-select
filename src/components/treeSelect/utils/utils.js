const setObj = (obj, path, value) => {
  const [head, ...restPath] = path;
  restPath.length ? setObj(obj[head], restPath, value) : (obj[head] = value);
};

const setObjAndAllChildren = (obj, path, value) => {
  const [head, ...restPath] = path;
  if (restPath.length) {
    setObjAndAllChildren(obj[head], restPath, value);
  } else {
    obj[head] = value;
    const setObjAllValue = (obj, value) => {
      obj.forEach((_, idx) => {
        obj[idx].checked = value;
        if (obj[idx].children.length) {
          setObjAllValue(obj[idx].children, value);
        }
      });
    };
    setObjAllValue(obj.children, value);
  }
};

const setObAllParent = (obj, path, value) => {
  const [head, ...restPath] = path;

  if (restPath.length > 1) {
    setObAllParent(obj[head], restPath, value);

    if (obj.children) {
      obj.checked = value;
    }
  }
};

const setAndCheckAllParent = (obj, path) => {
  const [head, ...restPath] = path;

  if (restPath.length) {
    const deepValue = setAndCheckAllParent(obj[head], restPath);
    if (deepValue) return deepValue;

    if (obj.children) {
      const getChecked = (item) => item.checked === true;
      const findItem = obj.children.find(getChecked);
      const value = Boolean(findItem);
      obj.checked = value;
      return value;
    }
  }

  return false;
};

export const getChangedData = ({ data, dataPath, eventChecked }) => {
  const changedData = JSON.parse(JSON.stringify(data));
  setObjAndAllChildren(changedData, dataPath, eventChecked);
  if (eventChecked) {
    setObAllParent(changedData, dataPath, true);
  } else {
    setAndCheckAllParent(changedData, dataPath);
  }

  return changedData;
};
