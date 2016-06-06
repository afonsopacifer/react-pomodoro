'use strict';

jest.unmock('./../Footer');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Footer from './../Footer';

describe('Footer', () => {

  it('verify the text content are correctly', () => {

    const footer = TestUtils.renderIntoDocument(
      <Footer />
    );

    const footerNode = ReactDOM.findDOMNode(footer);

    expect(footerNode.textContent).toEqual('Made with  by @afonsopacifer');
  });

  it('link of github author should be https://github.com/afonsopacifer', () => {

    const footer = TestUtils.renderIntoDocument(
      <Footer />
    );

    const linkElement = TestUtils.scryRenderedDOMComponentsWithTag(footer, 'a');

    expect(linkElement.length).toEqual(1);
    expect(linkElement[0].getAttribute('href')).toEqual('https://github.com/afonsopacifer');
  });
  
});