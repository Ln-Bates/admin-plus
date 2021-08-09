import { baseProps } from './base';
import { TABLE_TYPES } from '../constant';
function generateTableProp(show = true, question = '', config = {}) {
  return { show, question, config };
}

const tableHelper = {};

TABLE_TYPES.forEach(type => {
  /**
   * 
   * @param {String} label 属性名
   * @param {String | Array} prop 属性类型为btns时为按钮集合
   * @param {String} show 是否展示
   * @param {String} question 提示
   * @param {Object} config Element配置
   * @returns 
   */
  tableHelper[type] = function (label, prop, show, question, config) {
    return {
      ...baseProps(type, label, prop),
      ...generateTableProp(show, question, config)
    };
  };
});

export default tableHelper;