import axios from 'axios'
import React, { Component }  from 'react'
import BarGraph from './barGraph'
import Select from 'react-select';

class commonStudios extends Component {
    state = {
        userName: "",
        upper: 0,
        lower: 0,
        commonStudioCount: 0,
        okResponse: false,
        studios : null,

        upperOptions : [],
        lowerOptions : []
    }

    componentDidMount() {
        //Set up for upper/lower
        this.optionsSetup()
        
    }

    optionsSetup = () => {
        var options = []
        var i
        var option
        
        //Upper options
        for (i = 1; i <= 10; i++) {
            option = {
                value: i,
                label: i,
                stateAssociation: "upper"
            }
            options.push(option)
        }
        this.setState({
            upperOptions: options,
        })
        //Lower options
        options = []
        for (i = 1; i <= 10; i++) {
            option = {
                value: i,
                label: i,
                stateAssociation: "lower"
            }
            options.push(option)
        }
        this.setState({
            lowerOptions: options,
        })
    }

    handleInputChange = (e) => {
        const target = e.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value //[] is the value of the variable
        })
    }
    

    validateTask = (task) => {
        if (task.userName.length === 0 || task.upper.length === 0 || task.lower.length === 0 || task.commonCount.length === 0 ) {
            return false
        } else if (isNaN(task.upper) || isNaN(task.lower) || isNaN(task.commonCount)) {
            return false
        } else if (task.commonCount < 1) {
            return false
        }
        return true
    }

    getCommonStudios = (e) => {
        e.preventDefault(); //Prevents page/console reload
        this.setState({
            okResponse : false
        })

        const task = {
            userName: this.state.userName,
            upper: parseInt(this.state.upper),
            lower: parseInt(this.state.lower),
            commonCount: parseInt(this.state.commonStudioCount)
        }

        if (this.validateTask(task)) {
            console.log("Sending request.")
            console.log(task)
            axios({
                method: "post",
                url : "http://localhost:5000/api/commonStudios",
                data : task
            })
            .then(
                (response) => {
                    this.setState({
                        studios : response.data.studios,
                        okResponse : true
                    })
                    console.log(this.state) //todo remove test print
                }
            )
            .catch(
                (error) => {
                    console.log(error.response.message)
                }
            )
        } else {
            alert("Bad inputs, try again")
        }
    }

    handleUpperLowerChange = (option) => {
        var options = []
        var i
        if (option.stateAssociation === "upper") {
            //Change possible 'lower' values [1,upper]
            for (i = 1; i <= option.value; i++) {
                const newOption = {
                    value: i,
                    label: i,
                    stateAssociation: "lower"
                }
                options.push(newOption)
            }
            this.setState({
                lowerOptions: options,
                upper: option.value
            })
        } else {
            //Change possible 'upper' values [lower,10]
            for (i = option.value; i <= 10; i++) {
                const newOption = {
                    value: i,
                    label: i,
                    stateAssociation: "upper"
                }
                options.push(newOption)
            }
            this.setState({
                upperOptions: options,
                lower: option.value
            })
        }
    }
    
    render () {
        return (
            <div className = "feature">
                <div className = "input">
                    <form onSubmit={this.getCommonStudios}>
                        <label>
                            MyAnimeList Username:
                            <br/>
                            <input
                                name = "userName"
                                type = "text"
                                value = {this.state.userName}
                                onChange = {this.handleInputChange}
                            /> 
                        </label>
                        <br/>
                        
                        <label>
                            Upper
                            <Select
                                onChange = {this.handleUpperLowerChange}
                                options = {this.state.upperOptions}
                            />
                        </label>
                        <label>
                            Lower
                            <Select
                                onChange = {this.handleUpperLowerChange}
                                options = {this.state.lowerOptions}
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

                    <button>
                        Test
                    </button>
                </div>
                
                <div className = "output">
                    {                        
                        //Only display on ok response from backend
                        this.state.okResponse &&
                            <BarGraph data = {this.state.studios}/>
                    }
                </div>
            </div>
        )
    }
}

export default commonStudios