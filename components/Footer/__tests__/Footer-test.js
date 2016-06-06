'use strict';

jest.unmock('./../Footer');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Footer from './../Footer';

describe('Footer', () => {

  it('verify the text content and link are correctly', () => {

    const footer = TestUtils.renderIntoDocument(
    	<Footer />
    );

    const footerNode = ReactDOM.findDOMNode(footer);

    expect(footerNode.textContent).toEqual('Made with  by @afonsopacifer');
  });

});