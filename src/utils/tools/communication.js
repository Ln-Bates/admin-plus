export class Communication {
  constructor(self) {
    console.log(self);
    this.component = self;
    window.addEventListener('storage', this.handler.bind(this));
  }

  handler(ev) {
    const key = ev.key;
    if (key === 'storage-close') {
      this.close();
    }
    if (key === 'storage-update') {
      console.log(this.component);
      this.component.refreshData();
    }
  }

  close() {
    window.removeEventListener('storage', this.handler);
  }
}
