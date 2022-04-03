export function initialize( application ) {
  application.inject('component', 'gapi', 'service:gapi');
  application.inject('service:olx-phones', 'gapi', 'service:gapi');
}

export default {
  initialize
};
