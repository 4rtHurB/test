import Service from '@ember/service';
import { inject as service } from '@ember/service';
import {tracked} from "@glimmer/tracking";
import {toMd5} from '../utils/hash';
import config from 'phone-olx/config/environment';

const AUTH_HASHES = (config.APP.auth_hashes && config.APP.auth_hashes.length > 0)
  ? (config.APP.auth_hashes || '').split(',')
  : null;

export default class AuthService extends Service {
  @tracked password = '';
  @tracked events;

  @service gapi;

  get isAuthenticated() {
    return this.gapi.isAuthenticated;
  }

  get isAuthorized() {
    return this.isAuthenticated && this._isAuthorized;
  }

  get _isAuthorized() {
    if(!AUTH_HASHES) {
      return true;
    }

    return AUTH_HASHES.includes(toMd5(this.currentUserEmail));
  }

  get currentUserName() {
    return this.gapi.accountProfile && this.gapi.accountProfile.getName();
  }

  get currentUserEmail() {
    return this.gapi.accountProfile && this.gapi.accountProfile.getEmail();
  }

  signIn() {
    this.gapi.signIn();
  }

  signOut() {
    this.gapi.signOut();
  }
}
