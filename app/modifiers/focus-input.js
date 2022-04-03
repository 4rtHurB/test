import Modifier from 'ember-modifier';

export default class FocusInputModifier extends Modifier {
  get isFocus() {
    return this.args.named.isFocus;
  }

  didReceiveArguments() {
    if(this.isFocus) {
      this.element.focus();
    }
  }
}
