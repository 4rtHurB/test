export function correctPhoneFormat(phone) {
  // Replace all not number characters (+380 98*** to 098***)
  phone = phone.replace(/[^\d]+/g, '');

  // Replace UA code (380*** to 0***)
  const UACodeRegExp = /^380/g;
  if(UACodeRegExp.test(phone)) {
    phone = phone.replace(/^38/g, '');
  }

  // Add 0 to start of phone (98*** to 098***)
  const withoutFirst0RegExp = /^[1-9]\d{8}/g;
  if(withoutFirst0RegExp.test(phone)) {
    phone = `0${phone}`;
  }

  return phone;
}

export const urlRegExp =
  'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)';

export const phoneRegExp =
  '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$';
