import { ResponsiveBar } from '@nivo/bar'
import React, { Component } from 'react';

class barGraph extends Component {
    //Prob don't need a state to store the props.data again since state is supposed to be dynamic
    state = {
        data : this.props.data,
        barColor: this.props.barColor,
        highlightColor : this.props.highlightColor,
    }

    componentDidMount() {
        const dataCopy = Array.from(this.state.data)
        console.log(this.state)
        //add state.barColor to all of the data
        dataCopy.map(
            entry => entry.color = this.state.barColor
        )
        this.setState({
            data : dataCopy
        })
    }

    visitMALStudioPage  = (e) => {
        let url = "https://myanimelist.net/anime/producer/" + e.data.id.toString()
        window.open(url, '_blank').focus()
    }


    //Todo, figure out how to pass params into callback functions
    highlightBar = (data) => {
        this.changeBarColor(data.index, this.state.highlightColor)
    }

    revertBarColor = (data) => {
        this.changeBarColor(data.index, this.state.barColor)
    }

    changeBarColor = (index, color) => {
        const dataCopy = [...this.state.data]
        dataCopy[index].color = color
        this.setState({
            data: dataCopy
        })
    }
    

    render () {
        return ( 
            <div>
                <div style = {{height: "600px", width: "99%"}}>
                    <ResponsiveBar
                        //General
                        margin={{ top: 50, right: 80, bottom: 100, left: 100 }}
                        //Data
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
                                legend: "Anime Studio",
                                legendPosition: 'middle',
                                legendOffset: 50,
                                tickRotation: 14,
                            }
                        }
                        //Styling
                        colorBy = "index"
                        colors = {this.state.data.map(c => c.color)}
                        animate = {true}
                        //Interactivity
                        onClick = {this.visitMALStudioPage}
                        onMouseEnter={
                            this.highlightBar
                        }
                        onMouseLeave={
                            this.revertBarColor
                        }
                    />
                </div>
            </div>
        )
    }
}

export default barGraph