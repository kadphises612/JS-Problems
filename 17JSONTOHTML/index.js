function JSONToHTML(json) {
  if (Array.isArray(json)) {
    const fragment = document.createDocumentFragment();
    for (const el of json) {
      fragment.appendChild(JSONToHTML(el));
    }
    return fragment;
  }
  const node = document.createElement(json.type);
  if (json.props) {
    for (const key in json.props) {
      node.setAttribute(key, json.props[key]);
    }
  }
  if (Array.isArray(json.children)) {
    for (const child of json.children) {
      node.appendChild(JSONToHTML(child));
    }
  }
  if (typeof json.children === "string") {
    node.innerHTML = json.children;
  }
  return node;
}
