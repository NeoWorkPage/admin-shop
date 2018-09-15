import { observable, action, reaction } from 'mobx';

import Agent from '../agent';
import commonStore from './commonStore';

class AuthStore {
  @observable
  inProgress = false;

  @observable
  errors = undefined;

  @observable
  username = localStorage.getItem('username');

  @observable
  values = {
    phone: '',
    password: '',
  };

  constructor() {
    reaction(
      () => this.username,
      username => {
        if (username) {
          window.localStorage.setItem('username', username);
        } else {
          window.localStorage.removeItem('username');
        }
      },
    );
  }

  @action
  reset() {
    this.values.phone = '';
    this.values.password = '';
  }

  @action
  async login(values) {
    this.inProgress = true;
    this.errors = undefined;

    const user = await Agent.Auth.login(values.email, values.password);
    commonStore.setToken(user);
    this.inProgress = false;
  }

  @action
  setUserName(name) {
    this.username = name;
  }

  @action logout() { // eslint-disable-line
    commonStore.setToken(undefined);
    return Promise.resolve();
  }
}

export default new AuthStore();
