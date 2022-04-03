'use strict';

module.exports = function(/* environment, appConfig */) {
  return {
    name: "Номери телефонів",
    short_name: "Номери",
    description: "",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f8f9fa",
    theme_color: "#f8f9fa",
    icons: [
      {
        src: '/assets/images/logo32x32.png',
        sizes: '32x32',
        targets: ['favicon'],
      },
      {
        "src": "/assets/images/logo192x192.png",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "/assets/images/logo256x256.png",
        "sizes": "256x256",
        "type": "image/png"
      },
      {
        "src": "/assets/images/logo384x384.png",
        "sizes": "384x384",
        "type": "image/png"
      },
      {
        "src": "/assets/images/logo512x512.png",
        "sizes": "512x512",
        "type": "image/png"
      }
    ],
    ms: {
      tileColor: '#f8f9fa'
    }
  };
}
