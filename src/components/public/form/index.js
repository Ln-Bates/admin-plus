import TwoWay from 'mixins/two-way';
import FormCascader from 'public/form/cascader/index';
import FormCheckbox from 'public/form/checkbox/index';
import FormDate from 'public/form/date/index';
import FormInput from 'public/form/input/index';
import FormRadio from 'public/form/radio/index';
import FormSelect from 'public/form/select/index';
import FormSwitch from 'public/form/switch/index';
export default {
  components: {
    FormCascader,
    FormCheckbox,
    FormDate,
    FormInput,
    FormRadio,
    FormSelect,
    FormSwitch
  },
  mixins: [TwoWay]
};