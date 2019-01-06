import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { createStore } from 'redux'
import counter from './reducers'

const store = createStore(counter)

export default class Alphas extends Component {
    constructor(props) {
        super(props);
        this.state = { alphas: [] };
        this.headers = [
			{ key: 'id', label: 'ID' },
			{ key: 'description', label: 'DESCRIPTION' },
		];
    }

    componentDidMount() {
        fetch('api/alphas/')
        .then(response => response.json())
        .then(result => this.setState({alphas: result.data}));
    }

    render() {
        return (
            <table>
				<thead>
					<tr>
					{
						this.headers.map(function(h) {
							return (
								<th key = {h.key}>{h.label}</th>
							)
						})
					}
					</tr>
				</thead>
				<tbody>
					{
						this.state.alphas.map(function(item, key) {             
                            return (
                                <tr key = {key}>
                                    <td>{item.id}</td>
                                    <td>{item.description}</td>
                                </tr>
                            )
						})
					}
				</tbody>
			</table>
        );
    }
}

const render = () => ReactDOM.render(<Alphas/>, document.getElementById('mount'))

render()
store.subscribe(render)