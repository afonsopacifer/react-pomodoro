'use strict';

import React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="credits">
        Made with <span className="heart"></span> by <a href="https://github.com/afonsopacifer" className="link" target="_blank">@afonsopacifer</a>
      </footer>
    );
  };
};