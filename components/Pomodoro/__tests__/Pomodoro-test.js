'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Pomodoro from './../Pomodoro';

import { assert } from 'chai';

describe('Test Pomodoro Component', () => {
  var component; 

  beforeEach(function() {
    component = TestUtils.renderIntoDocument(
      <Pomodoro />
    );
  });

  it('verify the default state are correctly', () => {
    assert.equal(component.state.time, 1500);
    assert.equal(component.state.play, false);
    assert.equal(component.state.timeType, 1500);
    assert.equal(component.state.title, '25:00 | Pomodoro timer');
  });
});