import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'

import '../styles/App.css';
import Router from './Router'
import { connect } from 'react-redux';
import { simpleAction } from '../redux/actions'

class App extends Component {
  render() {
    return (
      <div>
        <Router />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps, null)(App);
