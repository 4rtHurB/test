import Service from '@ember/service';
import {computed} from '@ember/object';
import { getGapi } from 'gapi-browser';
import config from 'phone-olx/config/environment';
import {tracked} from "@glimmer/tracking";

export default class GapiService extends Service {
  @tracked gapi = null;
  @tracked isAuthenticated = false;

  constructor() {
    super();

    this._initGApi();
  }

  get gapiConfig() {
    return {
      apiKey: config.APP.gapi.api_key,
      clientId: config.APP.gapi.client_id,
      discoveryDocs: config.APP.gapi.discovery_docs,
      scope: config.APP.gapi.scopes
    };
  }

  async _initGApi() {
    try {
      const gapi = await getGapi;

      gapi.load('client:auth2', async () => {
        await gapi.client.init(this.gapiConfig);
        this.set('gapi', gapi);

        this.authInstance.isSignedIn.listen((isSignedIn) => this.onUpdateAuthStatus(isSignedIn));
        this.onUpdateAuthStatus(this.authInstance.isSignedIn.get());
      });
    } catch (e) {
      console.error(e.message);
    }
  }

  onUpdateAuthStatus(isSignedIn) {
    this.isAuthenticated = isSignedIn;
  }

  @computed('gapi')
  get isLoaded() {
    return this.gapi;
  }

  @computed('isLoaded')
  get authInstance() {
    if(this.isLoaded) {
      return this.gapi.auth2.getAuthInstance();
    }
  }

  @computed('isAuthenticated')
  get accountProfile() {
    if(this.isAuthenticated && this.authInstance.currentUser.get()) {
      return this.authInstance.currentUser.get().getBasicProfile();
    }
  }

  /**
   *  Sign in the user upon button click.
   */
  signIn() {
    this.authInstance.signIn();
  }

  /**
   *  Sign out the user upon button click.
   */
  signOut() {
    this.authInstance.signOut();
  }

  async readSheetRange(sheetId, range, options = {}) {
    const response = await this.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range,
    });

    return response.result;
  }

  async appendToSheetRange(sheetId, range, data, inputOption = 'RAW') {
    const response = await this.gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range,
      valueInputOption: inputOption,
      resource: {
        values: data
      }
    });

    return response.result.updates.updatedCells;
  }
}
