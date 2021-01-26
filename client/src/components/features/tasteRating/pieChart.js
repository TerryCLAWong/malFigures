import { ResponsivePie } from '@nivo/pie'
import React, { Component } from 'react';


class pieChart extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <div>

                <div style = {{height: "600px", width: "99%"}}>
                
                    <ResponsivePie
                        data = {this.props.data}
                        colors = {this.props.data.map(c => c.color)}
                    />
                    
                </div>
                
                
            </div>
        )
    }

    

}

export default pieChart