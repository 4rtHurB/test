import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import {action} from '@ember/object';

export default class AuthComponent extends Component {
  @service auth;
  @service gapi;

  @action
  onInput(event) {
    this.auth.events.trigger('password-change', event.target.value);
  }

  @action
  signIn() {
    this.auth.signIn();
  }
}
