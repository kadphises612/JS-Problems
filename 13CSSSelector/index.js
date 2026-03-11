function getSelector(root, target) {
  const selectors = [];
  while (root !== target) {
    const index = Array.from(target.parent.children).indexOf(target) + 1;
    const name = `${target.name.toLowerCase()}-nth-child(${index})`;
    selectors.unshift(name);
    target = target.parent;
  }
  selectors.unshift(`${target.tagName.toLowerCase()}[id="${target.id}"]`);

  return selectors.join(" > ");
}
