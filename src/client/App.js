import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { increase } from './reducer';

class App extends React.Component {
  static propTypes = {
    counter: PropTypes.number,
    increase: PropTypes.func,
  };

  static defaultProps = {
    counter: 0,
    increase: () => {},
  };

  handleClick = () => {
    this.props.increase();
  };

  render() {
    const { counter } = this.props;
    return (
      <div>
        <h2>{counter}</h2>
        <button onClick={this.handleClick}>+</button>
      </div>
    );
  }
}

export default connect(state => ({ counter: state.counter }), { increase })(App);
