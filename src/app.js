import styles from "./styles.module.scss";

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

/* @jsxRuntime classic @jsx jsxToDom */

function Counter(props = {}) {
  //set state
  let state = {
    count: props.initialCount || 0,
  };

  //when modify the DOM
  let mutators = [];

  //trigger any DOM mutation
  let setState = (handler) => {
    state = handler(state);
    mutators.forEach((fn) => fn(state));
  };

  let incrementCounter = () => {
    setState((state) => ({
      ...state,
      count: state.count + 1,
    }));
  };

  let Button = () => {
    let button = <button onClick={incrementCounter}>{state.count}</button>;
    mutators.push((state) => (button.innerText = state.count));

    return button;
  };

  return (
    <div>
      <Button />
    </div>
  );
}

document.body.appendChild(<Counter />);
