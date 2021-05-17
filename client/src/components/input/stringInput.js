import React, { Component }  from 'react'

class stringInput extends Component {
    render() {
        return (
            <div>
                <input 
                    className="input is-small" 
                    type="text"
                    name = {this.props.name}
                    value = {this.props.value}
                    onChange = {this.props.handler}
                />
            </div>
        )
    }
}

export default stringInput