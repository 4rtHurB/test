import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  phone: {
    validators: [
      validator('presence', {
        presence: true,
        message: 'Телефон має бути заповнений'
      }),
      validator('format', {
        type: 'phone',
        message: 'Невірний формат телефону'
      }),
      validator('phone-duplicate')
    ]
  },

  gender: {
    validators: [
      validator('presence', {
        presence: true,
        message: 'Стать має бути заповнена'
      })
    ]
  },

  link: {
    validators: [
      validator('presence', {
        presence: true,
        message: 'Посилання має бути введено'
      }),
      validator('format', {
        type: 'url',
        message: 'Невірне посилання'
      }),
    ]
  }
});
