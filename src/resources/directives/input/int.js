const int = el => {
  const inputEl = el.children[0];
  inputEl.onkeyup = () => {
    inputEl.value = inputEl.value.replace(/[^\d]/g, '');
    inputEl.dispatchEvent(new Event('input'));
  };
  inputEl.onblur = () => {
    inputEl.value = Number(inputEl.value);
    inputEl.dispatchEvent(new Event('input'));
  };
};

export default int;
