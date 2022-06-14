import { createEffect, createSignal } from 'solid-js';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = createSignal({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  function changeWindowSize() {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }

  createEffect(() => {
    window.addEventListener('resize', changeWindowSize);

    return () => {
      window.removeEventListener('resize', changeWindowSize);
    };
  });

  createEffect(() => {
    changeWindowSize();
  });

  return {
    windowSize,
  };
};

export default useWindowSize;
