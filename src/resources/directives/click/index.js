import { debounce } from 'utils';

const Click = {
  bind(el, binding) {
    const runMethod = function () {
      binding.value && binding.value();
    };
    const delay = binding.arg ? +binding.arg : 800;
    el.onclick = debounce(function () {
      runMethod();
    }, delay);
  }
};

export default {
  name: 'click',
  directive: Click
};

