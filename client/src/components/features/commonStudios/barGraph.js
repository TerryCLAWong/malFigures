import { ResponsiveBar } from '@nivo/bar'
import React, { Component } from 'react';

class barGraph extends Component {
    //Prob don't need a state to store the props.data again since state is supposed to be dynamic
    state = {
        data : this.props.data
    }

    render () {
        return ( 
            <ResponsiveBar
            
            />
        )
    }
}