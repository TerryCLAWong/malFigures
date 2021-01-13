import { ResponsiveBar } from '@nivo/bar'
import React, { Component } from 'react';

class barGraph extends Component {
    //Prob don't need a state to store the props.data again since state is supposed to be dynamic
    state = {
        data : this.props.data
    }



    /*
    Data should have the format:
    [
        {
            studio : 'trigger'
            count : 14
        }
    ]
    */
    
    render () {
        return ( 
            <div>
                <div style={{ height: "400px" }}>
                    <ResponsiveBar
                        data = {this.state.data}
                        keys = {["count"]}
                        indexBy = "studio"
                    />
                </div>
            </div>
        )
    }
}

export default barGraph