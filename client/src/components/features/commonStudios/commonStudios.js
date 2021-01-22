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

        console.log(this.state, task)

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

    renderError = () => {
        if (this.state.userDNE) {
            return <p>The user: {this.state.userName}, is not an existing myanimelist.net account</p>
        } else if (this.state.tokenError) {
            return <p>Backend Token Issue, Sorry!!!</p>
        } else if (this.state.disconnected) {
            return <p>Server is not responding....   oh shit.</p>
        }
    }

    handleOptionSelect = e => {
        const d = document.getElementById("upper").value;
        console.log(d)
        console.log(e)
        console.log(e.target.id)


        var options = []
        var i
        if (e.target.id === "upper") {
            const value = document.getElementById("upper").value;
            for (i = 1; i <= value; i++) {
                const newOption = {
                    value: i,
                    label: i, //todo remove
                    stateAssociation: "lower" //todo remove
                }
                options.push(newOption)
            }
            this.setState({
                lowerOptions: options,
                upper: value
            })
        } else if (e.target.id === "lower") {
            const value = document.getElementById("lower").value
            for (i = value; i <= 10; i++) {
                const newOption = {
                    value: i,
                    label: i,
                    stateAssociation: "lower" //todo remove
                }
                options.push(newOption)
            }
            this.setState({
                upperOptions: options,
                lower: value
            })
        } else if (e.target.id === "commonCount") {
            this.setState({
                commonStudioCount: document.getElementById("commonCount").value,
            })
        }
    }

    renderOptions = option => {
        return <option value = {option.value} key = {option.value}> {option.value} </option>
    }
    
    render () {
        return (
            <div>
                <section className = "section">
                    

                        
                        <div className="field">
                            <label className="label">MyAnimeList Username:</label>
                            <div className="control">
                                <input 
                                    className="input is-small" 
                                    type="text"
                                    name = "userName"
                                    value = {this.state.userName}
                                    onChange = {this.handleInputChange}
                                />
                            </div>
                        </div>


                        <div className = "columns">
                            <div className="column is-one-third">
                                <div className="field">
                                    <label className="label">Upper Score Bound</label>

                                    <div className = "select" onChange = {this.handleOptionSelect}>
                                        <select id = "upper">
                                            {this.state.upperOptions.map(this.renderOptions)}
                                        </select>
                                    </div>

                                </div>
                            </div>

                            <div className="column is-one-third">
                                <div className="field">
                                    <label className="label">Lower Score Bound</label>

                                    <div className = "select" onChange = {this.handleOptionSelect}>
                                        <select id = "lower">
                                            {this.state.lowerOptions.map(this.renderOptions)}
                                        </select>
                                    </div>
                                    
                                </div>
                            </div>

                            <div className="column is-one-third">
                                <div className="field">
                                    <label className="label">Common Studio Count</label>

                                    <div className = "select" onChange = {this.handleOptionSelect}>
                                        <select id = "commonCount">
                                            {this.state.commonStudioCountOptions.map(this.renderOptions)}
                                        </select>
                                    </div>

                                </div>
                            </div>
                        </div>

                        

                        

                       



                        
                        

                        <button className = "button"
                        onClick={this.getCommonStudios}>
                            Submit
                        </button>


                </section>
                
                <section className = "section">
                {                    
                        //Only display on ok response from backend
                        this.state.okResponse &&
                            <div className = "box">
                                <BarGraph 
                                    data = {this.state.studios}
                                    barColor = "hsl(214, 99%, 78%)"
                                    highlightColor = "hsl(214, 99%, 58%)"
                                />  
                            </div>

                            
                    }
                    {this.renderError()}
                </section>
            </div>
        )
    }

    

}

export default commonStudios