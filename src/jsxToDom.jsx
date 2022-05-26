export function jsxToDom(element, props, ...children) {
  //If I passed a component function
  if (typeof element === "function") {
    return element({ props, ...children });
  }

  //Create DOM element
  let el = document.createElement(element);
  if (props) {
    for (let key of Object.keys(props)) {
      let eventName = key.match(/^on([A-Z]\w+)$/);
      if (eventName) {
        el.addEventListener(eventName[1].toLowerCase(), props[key]);
      } else {
        el.setAttribute(key, props[key]);
      }
    }
  }
  for (let child of children) {
    el.appendChild(
      child instanceof HTMLElement ? child : document.createTextNode(child)
    );
  }
  return el;
}
