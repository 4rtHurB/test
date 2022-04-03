import Service from '@ember/service';
import config from 'phone-olx/config/environment';
import {tracked} from "@glimmer/tracking";
import {correctPhoneFormat} from "../utils/reg-exp";

export default class OlxPhonesService extends Service {
  @tracked sheetId = null;
  @tracked sheetReadRange = null;
  @tracked sheetAppendRange = null;

  init() {
    super.init(...arguments);

    this.sheetId = config.APP.spreadsheet.id;
    this.sheetReadRange = config.APP.spreadsheet.read_range;
    this.sheetAppendRange = config.APP.spreadsheet.append_range;
  }

  async getAllPhones() {
    const phones = [];

    let res = await this.gapi.readSheetRange(this.sheetId, this.sheetReadRange);
    if (res.values.length > 0) {
      for (let i = 0; i < res.values.length; i++) {
        let row = res.values[i];

        if(row[0]) {
          phones.push(correctPhoneFormat(row[0]));
        }

        if(row[1]) {
          phones.push(correctPhoneFormat(row[1]));
        }
      }
    }

    return phones;
  }

  async checkIfExistsPhone(phone) {
    phone = correctPhoneFormat(phone);
    const allPhones = await this.getAllPhones();

    return allPhones.includes(phone);
  }

  advertModelToSheetValues(advert) {
    return [
      [advert.gender, advert.phone, advert.link]
    ];
  }

  async saveAdvertToSheet(advert) {
    const sheetValues = this.advertModelToSheetValues(advert);
    return this.gapi.appendToSheetRange(this.sheetId, this.sheetAppendRange, sheetValues);
  }
}
