import styles from "./styles.module.scss";
import { Mounted } from "./mount";
import { jsxToDom } from "./jsxToDom";
/* @jsxRuntime classic @jsx jsxToDom */

function SliderComponent(props = {}) {
  document.body.className = styles.root;

  //Set state object
  let state = {
    index: 1,
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
      index: state.index === 1 ? 1 : state.index - 1,
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

  // let Mount = () => {
  // console.log("mount");
  // };

  // let UnMount = () => {
  //   console.log("unmount");
  // };

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

  let Slider = () => {
    let slider = (
      <div class={`${styles.slider}`} data-current-index={state.index}>
        <img
          src="https://drscdn.500px.org/photo/1022741589/q%3D80_m%3D2000/v2?sig=b5ab12b405a872dc1b912fb6d0dede28050dbbd3302cfd92195f245ca813f26e"
          alt="Ornans"
        />
        <img
          src="https://drscdn.500px.org/photo/1019025604/q%3D80_m%3D2000/v2?sig=178bfbfb7ebfd5921fa6a7d6520c0aec6188620fa58469710b7505b6f4424247"
          alt="Gerardmer"
        />
        <img
          src="https://drscdn.500px.org/photo/1031139731/q%3D80_m%3D2000/v2?sig=140071ee907596808aa6e0e1770784a56bb3084b53983cf4ff991072732792b9"
          alt="Blue horse"
        />
        <img
          src="https://drscdn.500px.org/photo/1031139658/q%3D80_m%3D2000/v2?sig=d766424ee7bfbb85eb05743e111e76fcbbaf8be1f32a75eef864807d23f72c08"
          alt="My brother's cat"
        />
      </div>
    );

    mutators.push(
      (state) => (slider.attributes["data-current-index"].value = state.index),
      (state) => (state.maxImagesSlider = slider.children.length)
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
document.body.appendChild(<SliderComponent />);
