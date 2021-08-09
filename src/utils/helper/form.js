import { FORM_TYPES_SINGLE, FORM_TYPES_GROUP } from '../constant';
import { baseProps } from './base';

function generateFormProp(show = true, disabled = false, config = {}) {
  return { show, disabled, config };
}

const formHelper = {};

FORM_TYPES_SINGLE.forEach(type => {
  /**
   * 无集合对象表单
   * @param {String} label 
   * @param {String} prop 
   * @param {Boolean} show 
   * @param {Boolean} disabled 
   * @param {Object} config 
   * @returns 
   */
  formHelper[type] = function (label, prop, show, disabled, config) {
    return {
      ...baseProps(type, label, prop),
      ...generateFormProp(show, disabled, config)
    };
  };
});

FORM_TYPES_GROUP.forEach(type => {
  /**
   * 集合对象表单
   * @param {String} label 
   * @param {String} prop 
   * @param {Boolean} show 
   * @param {Boolean} disabled 
   * @param {Array} options 
   * @param {Object} config 
   * @returns 
   */
  formHelper[type] = function (label, prop, show, disabled, options = [], config) {
    return {
      ...baseProps(type, label, prop),
      options,
      ...generateFormProp(show, disabled, config)
    };
  };
});

export default formHelper;