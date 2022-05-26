import styles from "./styles.module.scss";
import { jsxToDom } from "./jsxToDom";

/* @jsxRuntime classic @jsx jsxToDom */

function Slider(props = {}) {
  //Set state object
  let state = {
    index: 0,
  };

  //when modify the DOM
  let mutators = [];

  //trigger any DOM mutation, setState function
  let setState = (handler) => {
    state = handler(state);
    mutators.forEach((fn) => fn(state));
  };

  //Decrement function
  let decrementIndex = () => {
    setState((state) => ({
      ...state,
      index: state.index === 0 ? 0 : state.index - 1,
    }));
  };

  // Increment function
  let incrementIndex = () => {
    setState((state) => ({
      ...state,
      index: state.index + 1,
    }));
  };

  // Next button of the slider
  let NextButton = () => {
    let button = <button onClick={incrementIndex}>{state.index}</button>;
    mutators.push((state) => (button.innerText = state.index));

    return button;
  };

  // Previous button of the slider
  let PreviousButton = () => {
    let previousButton = (
      <button onClick={decrementIndex}>{state.index}</button>
    );
    mutators.push((state) => (previousButton.innerText = state.index));
    return previousButton;
  };

  return (
    <div>
      <PreviousButton />
      <NextButton />
    </div>
  );
}

document.body.appendChild(<Slider />);
