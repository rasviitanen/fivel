import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { createStore } from 'redux'
import Counter from './components/Counter'
import counter from './reducers'

const store = createStore(counter)

export default class Card extends Component {
    render() {
        return (
            <Counter
                value={store.getState()}
                onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
                onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
            />
        );
    }
}

const render = () => ReactDOM.render(<Card/>, document.getElementById('mount'))

render()
store.subscribe(render)