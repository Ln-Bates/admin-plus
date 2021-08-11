<template>
  <form-view
    v-model="model"
    :config="config"
  >
  </form-view>
</template>

<script>
import FormView from 'public/view/form';
import {
  form
} from 'helper';
export default {
  components: {
    FormView
  },
  data() {
    return {
      model: {
        base: {
          name: '22',
          age: '11'
        },
        msg: '啦啦啦',
        more: {
          name: '33',
          age: '44'
        },
        msg2: 'o o o '
      },
      config: [
        {
          title: '标题测试',
          list: [
            [
              form.input('测试1', 'base.name'),
              form.input('测试2', 'base.age')
            ],
            form.input('测试3', 'msg'),
            [
              form.input('测试4', 'more.name'),
              form.input('测试5', 'more.age'),
              form.input('测试5', 'msg2')
            ]
          ]
        },
        {
          title: '标题测试',
          list: [
            [
              form.input('测试1', 'base.name'),
              form.input('测试2', 'base.age')
            ],
            form.input('测试3', 'msg'),
            [
              form.input('测试4', 'more.name'),
              form.input('测试5', 'more.age'),
              form.input('测试5', 'msg2')
            ]
          ]
        }
      ]
    };
  },
  methods: {
    test() {
      return new Promise(resolve => {
        resolve();
      });
    }
  }
};
</script>

<style>
</style>