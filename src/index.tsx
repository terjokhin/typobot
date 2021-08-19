// eslint-disable-next-line no-use-before-define
import * as React from 'react';
import * as ReactDom from 'react-dom';

class App extends React.PureComponent {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return <h1>Hello world! yay!</h1>;
  }
}

ReactDom.render(
    <App />,
    // eslint-disable-next-line no-undef
    document.getElementById('app'),
);
