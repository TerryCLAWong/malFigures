import axios from 'axios'
import React, { Component }  from 'react'
import BarGraph from './barGraph'
import './commonStudios.css'
import StringInput from '../../input/stringInput'
import {HandleInputStringChange} from '../../helpers/inputHelpers'


class commonStudios extends Component {
    constructor(props) {
        super(props) //required
        //Init state
        this.state = {
            //Input
            userName: "",
            upper: 1,
            lower: 1,
            commonStudioCount: 1,
            //Output
            studios : null,
            //Errors
            badInput: false,
            okResponse: false,
            userDNE: false,
            tokenError: false,
            disconnected: false,
            //Select Options
            upperOptions : [],
            lowerOptions : [],
            commonStudioCountOptions: [],
        }

        this.handleInputChange = HandleInputStringChange.bind(this)
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

        document.getElementById("studioSubmit").disabled = true;

        this.setState({
            userDNE: false,
            okResponse : false,
            tokenError: false,
            disconnected: false,
            badInput: false
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
                    document.getElementById("studioSubmit").disabled = false
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
                    document.getElementById("studioSubmit").disabled = false
                }
            )
        } else {
            document.getElementById("studioSubmit").disabled = false
            this.setState({
                badInputs : true
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
        } else if (this.state.badInputs) {
            return <p>Bad inputs. Make sure everything is filled out.</p>
        }
    }

    handleOptionSelect = e => {
        var options = []
        var i
        if (e.target.id === "upper") {
            const value = document.getElementById("upper").value;
            for (i = 1; i <= value; i++) {
                const newOption = {
                    value: i,
                    label: i,
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

                <h2 id = "commonStudiosTitle">
                    Watched Anime Studios
                </h2>

                {/*Input Fields*/}
                <section className = "section">

                        <div className = "control">
                            <div className="field">
                                <label className="label">MyAnimeList Username:</label>
                                    <StringInput
                                        value = {this.state.userName}
                                        handler = {this.handleInputChange}
                                    />
                            </div>


                            <div className = "columns is-mobile"> {/* TODO change so that the selects look better on mobile */}
                                <div className="column is-one-fifth">
                                    <div className="field">
                                        <label className="label">Upper Score Bound</label>

                                        <div className = "select" onChange = {this.handleOptionSelect}>
                                            <select id = "upper">
                                                {this.state.upperOptions.map(this.renderOptions)}
                                            </select>
                                        </div>

                                    </div>
                                </div>

                                <div className="column is-one-fifth">
                                    <div className="field">
                                        <label className="label">Lower Score Bound</label>

                                        <div className = "select" onChange = {this.handleOptionSelect}>
                                            <select id = "lower">
                                                {this.state.lowerOptions.map(this.renderOptions)}
                                            </select>
                                        </div>
                                        
                                    </div>
                                </div>

                                <div className="column is-one-fifth">
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

                            <button id = "studioSubmit" className = "button is-primary"
                            onClick={this.getCommonStudios}>
                                Submit    
                            </button>

                        </div>
                       
                </section>
                

                {/*Output Section*/}
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