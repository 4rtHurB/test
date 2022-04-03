import Component from '@glimmer/component';
import {action} from '@ember/object';
import {tracked} from "@glimmer/tracking";

export default class InputPastTooltipComponent extends Component {
  @tracked canPaste = false;
  @tracked pasteText = null;
  @tracked isFocus = false;
  @tracked regExp = null;

  constructor() {
    super(...arguments);

    if(this.args.regExp) {
      this.regExp = new RegExp(this.args.regExp);
    }
  }

  get elementClass() {
    if(this.canClear) {
      return 'input-group';
    } else {
      return 'custom-control';
    }
  }

  get classValidation() {
    if(this.args.validation === 'error') {
      return 'is-invalid';
    } else if(this.args.validation === 'success') {
      return 'is-valid';
    }

    return '';
  }

  get classClearly() {
    if(this.canClear) {
      return 'form-control-clearly'
    }
  }

  get pastMessage() {
    if(this.canPaste) {
      return `Вставити '${this.pasteText}'`
    }
  }

  get canClear() {
    return this.args.value && this.args.value.length >= 10 && this.args.validation === 'error';
  }

  @action
  onChange(event) {
    this.args.onChange(event.target.value);
  }

  @action
  onClick() {
    this.canPasteFromClipboard(event.target.value, true);
  }

  @action
  onFocusIn(event) {
    this.canPasteFromClipboard(event.target.value, true);
  }

  @action
  onBlur(event) {
    this.canPasteFromClipboard(event.target.value, false);
  }

  @action
  onKeyUp(event) {
    if(this.args.onKeyUp) {
      this.args.onKeyUp(event.target.value);
    }

    this.canPasteFromClipboard(event.target.value, true);
  }

  @action
  async pasteFromClipboard() {
    let string = await this.getFromClipboard();

    this.args.onChange(string);
    if(this.args.onKeyUp) {
      this.args.onKeyUp(string);
    }

    this.canPaste = false;
    this.isFocus = true;
  }

  @action
  clearInput() {
    this.args.onChange('');
    this.isFocus = true;
  }

  async canPasteFromClipboard(value, isFocus) {
    const setCanPaste = async () => {
      let canPaste = false;
      if(isFocus && (!value || value === '')) {
        const string = await this.getFromClipboard();

        canPaste = (string && string.length)
          ? (this.regExp ? this.regExp.test(string) : !!string)
          : false;
      }

      this.canPaste = canPaste;
    }

    if(!isFocus) {
      setTimeout(setCanPaste, 200)
    } else {
      setCanPaste();
    }
  }

  async getFromClipboard() {
    this.pasteText = await navigator.clipboard.readText();
    return this.pasteText;
  }
}
