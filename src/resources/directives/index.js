import Vue from 'vue';
import input from './input';
import click from './click';
import permission from './permission';

const directives = [
  input, click, permission
];

directives.forEach(item => {
  Vue.directive(item.name, item.directive);
});
