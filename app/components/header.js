import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthAccountComponent extends Component {
  @service auth;

  @action
  signOut() {
    this.auth.signOut();
  }
}
