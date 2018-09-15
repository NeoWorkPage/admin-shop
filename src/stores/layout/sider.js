import { observable, action } from 'mobx';

class SiderStore {
  @observable
  collapsed = false;

  @action
  setShowCollapsed(collapsed) {
    this.collapsed = collapsed;
  }
}

export default new SiderStore();
