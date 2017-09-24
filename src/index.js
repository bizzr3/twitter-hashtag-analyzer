import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TwitCounter from './components/tha/index';

class App extends Component {
    render() {
        return (
            <TwitCounter />
        )
    }
};

ReactDOM.render(<App />, document.getElementById('app'));
