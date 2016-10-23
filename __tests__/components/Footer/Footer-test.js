'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Footer from './../../../app/components/Footer/Footer';

import { assert } from 'chai';

describe('<Footer /> tests of node elements', () => {
  var component;

  var wrapper = React.createClass({
    render() {
      return <Footer />;
    }
  });

  beforeEach(function() {
    component = TestUtils.renderIntoDocument(
      React.createElement(wrapper)
    );
  });

  it('the link of github author should be https://github.com/afonsopacifer', () => {
    let linkElement = TestUtils.scryRenderedDOMComponentsWithTag(component, 'a');

    assert.equal(linkElement.length, 1);
    assert.equal(linkElement[0].getAttribute('href'), 'https://github.com/afonsopacifer', 'the link is incorrect');
  });

});
