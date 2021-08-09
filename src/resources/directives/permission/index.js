const Permission = function(el, binding, vnode) {
  const val = binding.value || '';
  setTimeout(() => {
    const vm = vnode.context;
    const pass = vm && vm.$permission && vm.$permission(val);
    if (!pass) {
      if (!el.parentNode) console.warn('warn in permission\\directive: el.parentNode is null');
      if (el.parentNode && el.parentNode.removeChild) el.parentNode.removeChild(el);
    }
  }, 100);
};

export default {
  name: 'permission',
  directive: Permission
};
