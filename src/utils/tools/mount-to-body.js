import Vue from 'vue';
import router from '@/router';
import store from '@/store';

/**
 * 将组件独立挂载到文档末尾
 * @param component
 * @param propsData
 * @return {Vue}
 */
export function mountToBody(component, propsData) {
  const Constructor = Vue.extend(component);
  const comp = new Constructor({
    propsData,
    router,
    store
  }).$mount();
  document.body.appendChild(comp.$el);
  return comp;
}
