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
                        margin={{ top: 50, right: 80, bottom: 50, left: 100 }}
                        data = {this.state.data}
                        keys = {["count"]}
                        indexBy = "studio"
                        axisLeft = {
                            {
                                legend: "Animes Produced",
                                legendPosition: 'middle',
                                legendOffset: -50,
                            }
                        }
                        axisBottom = {
                            {
                                legend: "Studio",
                                legendPosition: 'middle',
                                legendOffset: 40,
                            }
                        }
                    />
                </div>
            </div>
        )
    }
}

export default barGraph