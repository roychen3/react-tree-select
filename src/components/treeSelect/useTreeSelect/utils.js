const getChecked = (item) => item.checked === true;

export const setObj = (obj, path, value) => {
  const [head, ...restPath] = path;
  restPath.length ? setObj(obj[head], restPath, value) : (obj[head] = value);
};

export const setDisplayObjAllChecked = (obj, value) => {
  obj.forEach((_, idx) => {
    if (obj[idx].searchDisplay !== false) {
      obj[idx].checked = value;
    }

    if (obj[idx].children.length) {
      setDisplayObjAllChecked(obj[idx].children, value);
    }
  });
};

export const setObjAndAllDisplayChildren = (obj, path, value) => {
  const [head, ...restPath] = path;
  if (restPath.length) {
    setObjAndAllDisplayChildren(obj[head], restPath, value);
  } else {
    setDisplayObjAllChecked(obj.children, value);
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

export const setAndCheckAllParent = (obj, path) => {
  const [head, ...restPath] = path;

  if (restPath.length) {
    const deepValue = setAndCheckAllParent(obj[head], restPath);
    if (deepValue) return deepValue;

    if (obj.children) {
      const value = obj.children.some(getChecked);
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

    const checkDisplay = (item) => item.searchDisplay === true;
    const childrenHasDisplay = children.some(checkDisplay);

    return {
      ...item,
      children,
      searchDisplay: isMatched || childrenHasDisplay,
      searchDisabled: !isMatched,
    };
  };
  return data.map(matchTree);
};
