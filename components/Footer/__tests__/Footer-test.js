'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Footer from './../Footer';

import { assert } from 'chai';

describe('Footer', () => {

  const footer = TestUtils.renderIntoDocument(
    <Footer />
  );

  it('verify the text content are correctly', () => {
    let footerNode = ReactDOM.findDOMNode(footer);
    
    assert.equal(footerNode.textContent, 'Made with  by @afonsopacifer');
  });

  it('link of github author should be https://github.com/afonsopacifer', () => {
    let linkElement = TestUtils.scryRenderedDOMComponentsWithTag(footer, 'a');

    assert.equal(linkElement.length, 1);
    assert.equal(linkElement[0].getAttribute('href'), 'https://github.com/afonsopacifer', 'the link is incorrect');
  });

});