import { observable, action, computed } from 'mobx';
import Cookie from 'mobx-cookie';
import Moment from 'moment';

import agent from '../agent';
import AuthStore from './authStore';

class CommonStore {
  appTitleBase = 'Admin Shop';

  @observable
  cookieAt = new Cookie('at');

  @observable
  cookieRt = new Cookie('rt');

  @observable
  cookieScope = new Cookie('scope');

  @observable
  appName = 'SCP';

  @observable
  appTitle = this.appTitleBase;

  @computed
  get accessToken() {
    return this.cookieAt.get();
  }

  @computed
  get refreshToken() {
    return this.cookieRt.get();
  }

  @computed
  get scope() {
    return this.cookieScope.get();
  }

  @action
  removeAt() {
    this.cookieAt.remove();
  }

  @action
  removeRt() {
    this.cookieRt.remove();
  }

  @action
  setToken(token) {
    if (!token) {
      this.removeAt();
      this.removeRt();
    } else {
      const options = {
        expires: Moment()
          .add(38, 's')
          .toDate(),
      };
      this.cookieAt.set(token.token, options);
      this.cookieRt.set(token.refreshToken);
    }
  }

  @action
  async setRefreshToken() {
    const { refreshToken } = this;
    if (!refreshToken) {
      await AuthStore.logout();
      return undefined;
    }
    const res = await agent.Auth.refreshToken(refreshToken);
    this.setToken(res);
    return res;
  }
}

export default new CommonStore();
