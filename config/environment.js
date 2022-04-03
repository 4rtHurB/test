'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'phone-olx',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      auth_hashes: '0ac167d55a3b23cb582c84efb861c293',

      gapi: {
        api_key: 'AIzaSyCfnKCDt5Iama6OCACMMMwcPrp9Xc9zamU',
        client_id: '624454384641-mn4roln12nfptfsgm8ligifh8fidjgmi.apps.googleusercontent.com',
        scopes: 'https://www.googleapis.com/auth/spreadsheets',
        discovery_docs: ['https://sheets.googleapis.com/$discovery/rest?version=v4']
      },

      spreadsheet: {
        id: '10sKK6wlxmipYaRdx5VAerhBhoX-yNcNbQ0-gZnUa-r4',
        read_range: '\'Оголошення\'!AC2:AD1000',
        append_range: '\'Оголошення\'!A336:C1000'
      }
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  ENV['ember-cli-workbox'] = {
    enabled: environment !== 'test',
    debug: true,
    autoRegister: true,
    importScriptsGlobPatterns: [
      'assets/service-workers/*.js'
    ]
  };

  ENV['workbox'] = {
    globPatterns: [
      '**\/*.{html,js,css,png,webmanifest}'
    ],

    runtimeCaching: [
      {
        urlPattern: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
        handler: 'cacheFirst'
      },
      {
        urlPattern: /https:\/\/.*.google.com.*/,
        handler: 'cacheFirst'
      },
      {
        urlPattern: /https:\/\/content-sheets.googleapis.com.*/,
        handler: 'cacheFirst'
      }
    ],

    globDirectory: './',
  };

  if (environment === 'production') {
    ENV.APP.auth_hashes = process.env.AUTH_HASHES;
    // here you can enable a production-specific feature
  }

  return ENV;
};
