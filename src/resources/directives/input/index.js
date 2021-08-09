import int from './int';
import float from './float';

const Input = {
  bind(el, binding) {
    const arg = binding.arg;
    switch (arg) {
      case 'int':
        int(el);
        break;
      case 'float':
        float(el, binding.value || 2);
        break;
    }
  }
};

export default {
  name: 'input',
  directive: Input
};
