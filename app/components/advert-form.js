import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import {action, computed} from '@ember/object';
import {getOwner} from '@ember/application';
import {tracked} from "@glimmer/tracking";
import {correctPhoneFormat, urlRegExp, phoneRegExp} from "../utils/reg-exp";
import AdvertModel from "../models/advert";

const GENDER_OPTIONS = ['Чоловік', 'Жінка']

export default class AdvertFormComponent extends Component {
  @tracked advert;
  @tracked isSuccessSave = false;
  @tracked isShowMessage = false;
  @tracked isShowValidation = false;

  constructor() {
    super(...arguments);
    this.initAdvertModel();
  }

  @service olxPhones;

  get genderOptions() {
    return GENDER_OPTIONS;
  }

  get urlRegExp() {
    return urlRegExp;
  }

  get phoneRegExp() {
    return phoneRegExp;
  }

  get messageType() {
    if(this.isSuccessSave) {
      return 'success';
    } else {
      return 'danger';
    }
  }

  get messageText() {
    if(this.isSuccessSave) {
      return 'Номер доданий до таблиці';
    } else {
      return 'Не вдалося додати номер';
    }
  }

  initAdvertModel() {
    this.advert = AdvertModel.create(
      getOwner(this).ownerInjection(),
      {gender: GENDER_OPTIONS[0]}
    );

    return this.advert;
  }

  @action
  async submit() {
    this.isSuccessSave = await this.olxPhones.saveAdvertToSheet(this.advert);
    if(this.isSuccessSave) {
      this.clearForm();
      this.showMessage();
    }
  }

  @action
  clearForm() {
    this.toggleShowValidation(false);
    this.initAdvertModel();
  }

  @action
  onPhoneChange(value) {
    this.advert.set('phone', correctPhoneFormat(value));

    if(value.length >= 10) {
      this.toggleShowValidation(true);
    }
  }

  @action
  showMessage() {
    this.toggleMessage(true);
    this.startHideMessageTimer();
  }

  @action
  toggleMessage(isShow) {
    this.isShowMessage = isShow;
  }

  @action
  onStartEdit() {
    this.toggleShowValidation(true);
  }

  @action
  toggleShowValidation(isShow) {
    this.isShowValidation = isShow;
  }

  startHideMessageTimer() {
    setTimeout(() => {
      this.toggleMessage(false);
    }, 5000)
  }
}
