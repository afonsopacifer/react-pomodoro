let jsdom = require('jsdom');

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;

global.Notification = {
	requestPermission: function () {}
};

global.navigator = {
  userAgent: 'node.js'
};