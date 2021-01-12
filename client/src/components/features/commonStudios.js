import React, { Component }  from 'react';

class commonStudios extends Component {



    state = {
        userName: "",
        upper: 0,
        lower: 0,
        commonStudioCount: 0
    }



    handleInputChange = (e) => {
        const target = e.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value //[] is the value of the variable
        })
    }

    getCommonStudios = (e) => {
        e.preventDefault(); //Prevents page/console reload
        console.log(this.state)
    }
    
    render () {
        return (
            /*
            Input fields in state for
                username
                lower
                upper
                commonCount
            
            Button that calls the backend

            Result section
                ordered list from the results

            */
            <div>
                
                <form onSubmit={this.getCommonStudios}>
                    <label>
                        MyAnimeList Username:
                        <input
                            name = "userName"
                            type = "text"
                            value = {this.state.userName}
                            onChange = {this.handleInputChange}
                        /> 
                    </label>
                    <br/>
                    <label>
                        Upper Score:
                        <input
                            name = "upper"
                            type = "number"
                            value = {this.state.upper}
                            onChange = {this.handleInputChange}
                            min = "0"
                            max = "10"
                        /> 
                    </label>
                    <br/>
                    <label>
                        Lower Score:
                        <input
                            name = "lower"
                            type = "number"
                            value = {this.state.lower}
                            onChange = {this.handleInputChange}
                            min = "0"
                            max = "10"
                        /> 
                    </label>
                    <br/>
                    <label>
                        Common Studio Count:
                        <input
                            name = "commonStudioCount"
                            type = "number"
                            value = {this.state.commonStudioCount}
                            onChange = {this.handleInputChange}
                            min = "1"
                        /> 
                    </label>
                    <br/>
                    <input type="submit" value="Submit"/>
                </form>


                <h2>HELLO</h2>
                <p>Cras facilisis urna ornare ex volutpat, et
                convallis erat elementum. Ut aliquam, ipsum vitae
                gravida suscipit, metus dui bibendum est, eget rhoncus nibh
                metus nec massa. Maecenas hendrerit laoreet augue
                nec molestie. Cum sociis natoque penatibus et magnis
                dis parturient montes, nascetur ridiculus mus.</p>
                <p>Duis a turpis sed lacus dapibus elementum sed eu lectus.</p>
            </div>
        )
    }
}

export default commonStudios