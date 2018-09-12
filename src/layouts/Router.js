import React, { Component } from 'react';
import '../styles/App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { simpleAction } from '../redux/actions'
import Widget from './widget'
import Main from './main'

class AppRouter extends Component {
  render() {
    const renderMergedProps = (component, ...rest) => {
      const finalProps = Object.assign({}, ...rest);
      return (
        React.createElement(component, finalProps)
      );
    }

    const PropsRoute = ({ component, ...rest }) => {
      return (
        <Route {...rest} render={routeProps => {
          return renderMergedProps(component, routeProps, rest);
        }}/>
      );
    }
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path='/' component={Main} />
            <PropsRoute path='/widget' component={Widget}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps, null)(AppRouter);
