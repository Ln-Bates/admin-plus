import { CONFIRM_BUTTON_TEXT, SUCCESS_MESSAGE } from 'constant';

const Confirm = {
  install(Vue) {
    Vue.prototype.confirm = function (confirmMsg, confirmText = CONFIRM_BUTTON_TEXT, cb, title = '提示') {
      let confirmButtonText = confirmText;
      if (typeof confirmButtonText !== 'string') {
        confirmButtonText = CONFIRM_BUTTON_TEXT;
      }
      const $confirm = this.$confirm(confirmMsg, title, {
        confirmButtonText,
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (cb && action === 'confirm') {
            instance.confirmButtonLoading = true;
            cb().then(res => {
              const msg = res ? res.message : SUCCESS_MESSAGE;
              this.$message.success(msg);
            }).finally(() => {
              setTimeout(() => {
                done();
                instance.confirmButtonLoading = false;
              }, 200);
            });
          } else {
            done();
          }
        }
      });
      $confirm.catch(() => {
        this.$message.info('已取消操作');
      });
      return $confirm;
    };
  }
};

export default Confirm;
