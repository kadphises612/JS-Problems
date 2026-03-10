const getStyleByBrowser = (p, v) => {
  const div = document.createElement("div");
  div.style[property] = v;
  document.body.appendChild(div);
  const style = window.getComputedStyle(div)[property];

  document.body.removeChild(div);
  return style;
};

const getElementByStyle = (rootEleme, property, value) => {
  const elementStyle = getStyleByBrowser(property, value);
  const result = [];

  const searchElemet = (root, property, value) => {
    const style = window.getComputedStyle(root)[property];
    if (style === elementStyle) {
      result.push(root);
    }
    for (let i = 0; i < root.childrens; i++) {
      const child = root.childrens[i];
      searchElemet(child, property, value);
    }
  };
  searchElemet(rootEleme, property, value);
  return result;
};
