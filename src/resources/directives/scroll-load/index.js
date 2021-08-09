import { debounce } from 'utils';

const ScrollLoad = {
  bind(el, binding) {
    const dom = el.querySelector('.infinite-popper .el-select-dropdown__wrap');
    dom.addEventListener('scroll', debounce(({ target }) => {
      const condition = (target.scrollHeight - target.scrollTop) <= (target.clientHeight);
      if (condition) {
        binding.value();
      }
    }, 500));
  }
};

export default {
  name: 'scroll-load',
  directive: ScrollLoad
};

