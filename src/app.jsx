import styles from "./styles.module.scss";
import { jsxToDom } from "./jsxToDom";
/* @jsxRuntime classic @jsx jsxToDom */

function Slider(props = {}) {
  document.body.className = styles.root;

  //Set state object
  let state = {
    index: 0,
    maxImagesSlider: 4,
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
      index:
        state.maxImagesSlider <= state.index
          ? state.maxImagesSlider
          : state.index + 1,
    }));
  };

  // Next button of the slider
  let NextButton = () => {
    let button = <button onClick={incrementIndex}>Next</button>;
    return button;
  };

  // Previous button of the slider
  let PreviousButton = () => {
    let previousButton = <button onClick={decrementIndex}>Previous</button>;
    return previousButton;
  };

  let CurrentIndexIndicator = () => {
    let currentIndexIindicator = (
      <span>
        {state.index} / {state.maxImagesSlider}
      </span>
    );
    mutators.push(
      (state) =>
        (currentIndexIindicator.innerText = `${state.index} / ${state.maxImagesSlider}`)
    );
    return currentIndexIindicator;
  };

  let Slider = (index) => {
    let currentImage = state.index;
    // mutators.push((state) => (currentImage = state.index));

    let slider = (
      <div class={`${styles.slider}`}>
        <img
          class={state.index === 0 ? styles.active : styles.inactive}
          src="https://drscdn.500px.org/photo/1022741589/q%3D80_m%3D2000/v2?sig=b5ab12b405a872dc1b912fb6d0dede28050dbbd3302cfd92195f245ca813f26e"
          alt="Ornans"
        />
        <img
          class={state.index === 1 ? styles.active : styles.inactive}
          src="https://drscdn.500px.org/photo/1019025604/q%3D80_m%3D2000/v2?sig=178bfbfb7ebfd5921fa6a7d6520c0aec6188620fa58469710b7505b6f4424247"
          alt="Gerardmer"
        />
        <img
          class={state.index === 2 ? styles.active : styles.inactive}
          src="https://drscdn.500px.org/photo/1031139731/q%3D80_m%3D2000/v2?sig=140071ee907596808aa6e0e1770784a56bb3084b53983cf4ff991072732792b9"
          alt="Blue horse"
        />
        <img
          class={state.index === 3 ? styles.active : styles.inactive}
          src="https://drscdn.500px.org/photo/1031139658/q%3D80_m%3D2000/v2?sig=d766424ee7bfbb85eb05743e111e76fcbbaf8be1f32a75eef864807d23f72c08"
          alt="My brother's cat"
        />
      </div>
    );
    return slider;
  };

  return (
    <div class="root">
      <Slider />
      <div class={styles.buttons}>
        <PreviousButton />
        <CurrentIndexIndicator />
        <NextButton />
      </div>
    </div>
  );
}
document.body.appendChild(<Slider />);
