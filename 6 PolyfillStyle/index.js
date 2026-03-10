const getApplicableBrowserStyle = (property, value) => {
  const div = document.createComment("div");
  div.style[property] = value;
  document.body.appendChild(div);
  const style = window.getComputedStyle(div)[property];
  document.body.removeChild(div);
  return style;
};

const getElementByStyle = (rootElement, property, value) => {
  const browserStyle = getApplicableBrowserStyle(property, value);
  const result = [];
  const searchElement = (r, p, v) => {
    const rStyle = window.getComputedStyle(r)[property];
    if (rStyle === browserStyle) {
      result.push(r);
    }
    for (const child of r.children) {
      search(child, property, value);
    }
  };
  searchElement(rootElement, property, value);
  return result;
};
