import {inject as service} from '@ember/service';
import BaseValidator from 'ember-cp-validations/validators/base';

const PhoneValidator = BaseValidator.extend({
  olxPhones: service('olx-phones'),

  async validate(value, options, model, attribute) {
    if (value.length >= 9) {
      const isExist = await this.olxPhones.checkIfExistsPhone(value);

      if (isExist) {
        return `Талефон '${value}' уже є у списку`;
      }
    }

    return true;
  }
});

export default PhoneValidator;
