export const setObj = (obj, path, value) => {
  const [head, ...restPath] = path;
  restPath.length ? setObj(obj[head], restPath, value) : (obj[head] = value);
};

export const setObjAllValue = (obj, value) => {
  obj.forEach((_, idx) => {
    if (obj[idx].display !== false) {
      obj[idx].checked = value;
    }

    if (obj[idx].children.length) {
      setObjAllValue(obj[idx].children, value);
    }
  });
};

export const setObjAndAllChildren = (obj, path, value) => {
  const [head, ...restPath] = path;
  if (restPath.length) {
    setObjAndAllChildren(obj[head], restPath, value);
  } else {
    setObjAllValue(obj.children, value);
    obj[head] = value;
  }
};

export const setObAllParent = (obj, path, value) => {
  const [head, ...restPath] = path;

  if (restPath.length > 1) {
    setObAllParent(obj[head], restPath, value);

    if (obj.children) {
      obj.checked = value;
    }
  }
};

const filterDisplay = (item) => item.display !== false;

export const setAndCheckAllParent = (obj, path) => {
  const [head, ...restPath] = path;

  if (restPath.length) {
    const deepValue = setAndCheckAllParent(obj[head], restPath);
    if (deepValue) return deepValue;

    if (obj.children) {
      const getChecked = (item) => item.checked === true;
      const findItem = obj.children.filter(filterDisplay).find(getChecked);
      const value = Boolean(findItem);
      obj.checked = value;
      return value;
    }
  }

  return false;
};

export const deepSearch = ({ data, regKeyWord, parentIsMatched = false }) => {
  const matchTree = (item) => {
    const isMatched = parentIsMatched || !!item.name.match(regKeyWord);
    const children = deepSearch({
      data: item.children,
      regKeyWord,
      parentIsMatched: isMatched,
    });

    const checkDisplay = (item) => item.display === true;
    const childrenHasDisplay = isMatched || children.some(checkDisplay);

    return {
      ...item,
      children,
      display: childrenHasDisplay || isMatched,
    };
  };
  return data.map(matchTree);
};

export const deepCheckObj = (data) => {
  const checkObj = (item) => {
    const children = deepCheckObj(item.children);
    const checkChecked = (item) => item.checked;
    const childrenHasChecked = children.length
      ? children.filter(filterDisplay).some(checkChecked)
      : item.checked;

    return {
      ...item,
      children,
      checked: childrenHasChecked,
    };
  };
  return data.map(checkObj);
};
