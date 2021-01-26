import React, { Component }  from 'react'

/**
 * Generic numeric select component
 * 
 * id - of the select tag to get value from
 * handler - callback for on-change
 * options - array of option objects
 */
class numericSelect extends Component {
    renderOptions = option => {
        return <option value = {option.value} key = {option.value}> {option.value} </option>
    }

    render() {
        return (
            
            <div className = "select" onChange = {this.props.handler}>
                <select id = {this.props.id}>
                    {this.props.options.map(this.renderOptions)}
                </select>
            </div>
           
        )
    }
}

export default numericSelect