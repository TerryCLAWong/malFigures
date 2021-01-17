import axios from 'axios'
import React, { Component }  from 'react'
import BarGraph from './barGraph'
import Select from 'react-select';

class commonStudios extends Component {
    state = {
        //Input
        userName: "",
        upper: 0,
        lower: 0,
        commonStudioCount: 0,
        //Output
        studios : null,
        //Errors
        okResponse: false,
        userDNE: false,
        tokenError: false,
        disconnected: false,
        //Select Options
        upperOptions : [],
        lowerOptions : [],
        commonStudioCountOptions: [],
        //Bargraph colors

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
        //Studio count options
        options = []
        for (i = 1; i <= 20; i++) {
            option = {
                value: i,
                label: i,
                stateAssociation: "commonStudioCount"
            }
            options.push(option)
        }
        this.setState({
            commonStudioCountOptions: options,
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
            userDNE: false,
            okResponse : false,
            tokenError: false,
            disconnected: false
        })

        const task = {
            userName: this.state.userName,
            upper: parseInt(this.state.upper),
            lower: parseInt(this.state.lower),
            commonCount: parseInt(this.state.commonStudioCount)
        }

        if (this.validateTask(task)) {
            console.log("Sending request body:")
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
                }
            )
            .catch(
                (error) => {
                    console.log(error.message)
                    if (error.message === "Network Error") { 
                        this.setState({
                            disconnected: true
                        })
                    } else {
                        let errorMessage = error.response.data.MAL_API_Error
                        if (errorMessage === "not_found") {
                            this.setState({
                                userDNE: true
                            })
                        } else if (errorMessage === "invalid_token") {
                            this.setState({
                                tokenError: true
                            })
                        }
                        //todo more cases
                    }
                }
            )
        } else {
            alert("Bad inputs, try again")
        }
    }

    handleSelectChange = (option) => {
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
        } else if (option.stateAssociation === "lower") {
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
        } else if (option.stateAssociation === "commonStudioCount") {
            this.setState({
                commonStudioCount: option.value
            })
        }
    }

    renderError = () => {
        if (this.state.userDNE) {
            return <p>The user: {this.state.userName}, is not an existing myanimelist.net account</p>
        } else if (this.state.tokenError) {
            return <p>Backend Token Issue, Sorry!!!</p>
        } else if (this.state.disconnected) {
            return <p>Server is not responding....   oh shit.</p>
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
                            Upper:
                            <Select
                                onChange = {this.handleSelectChange}
                                options = {this.state.upperOptions}
                            />
                        </label>
                        <label>
                            Lower:
                            <Select
                                onChange = {this.handleSelectChange}
                                options = {this.state.lowerOptions}
                            />
                        </label>
                        <label>
                            Common Studio Count:
                            <Select
                                onChange = {this.handleSelectChange}
                                options = {this.state.commonStudioCountOptions}
                            />
                        </label>
                        <br/>
                        <input type="submit" value="Submit"/>
                    </form>
                </div>
                
                <div className = "output">
                {                    
                        //Only display on ok response from backend
                        this.state.okResponse &&
                            <BarGraph 
                                data = {this.state.studios}
                                barColor = "hsl(214, 99%, 78%)"
                                highlightColor = "hsl(214, 99%, 58%)"
                            />
                        
                    }
                    {this.renderError()}
                </div>
            </div>
        )
    }

    

}

export default commonStudios