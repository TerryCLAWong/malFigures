import axios from 'axios'
import React, { Component }  from 'react'
import PieChart from './pieChart'
import './tasteRating.css'
import {HandleInputStringChange} from '../../helpers/inputHelpers'
import StringInput from '../../input/stringInput'

class tasteRating extends Component {   

    state = {
        //Response
        okResponse: false,
        //Input
        userName: "",
        upper: 1,
        lower: 1,
        //Select Options
        upperOptions: [],
        lowerOptions: [],
        //Output
        data: [],
    }

    constructor(props) {
        super(props)

        this.handleInputChange = HandleInputStringChange.bind(this)
    }

    componentDidMount() {
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
    }

    validateTask = (task) => {
        if (task.userName.length === 0 || task.upper.length === 0 || task.lower.length === 0 ) {
            return false
        } else if (isNaN(task.upper) || isNaN(task.lower)) {
            return false
        } 
        return true
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
        }
    }

    renderOptions = option => {
        return <option value = {option.value} key = {option.value}> {option.value} </option>
    }

    getTasteRating = (e) => {
        e.preventDefault(); //Prevents page/console reload

        this.setState({
            okResponse: false
        })

        const task = {
            userName: this.state.userName,
            upper: parseInt(this.state.upper),
            lower: parseInt(this.state.lower),
        }

        if (this.validateTask(task)) {
            console.log("Sending request body:")
            console.log(task)

            axios({
                method: "post",
                url : "http://localhost:5000/api/tasteRating",
                data : task
            })
            .then(
                (response) => {
                    
                    this.setState({
                        okResponse: true,
                        data: response.data.data
                    })
                    console.log("SUCCESS")
                    console.log(response.data)  
                    console.log(this.state)
                }   
            ).catch(
                (error) => {
                    console.log(error.message)
                }
            )

        } else {
            alert("bad inputs")
        }

    }


    render() {
        return (
            <div>
                <h2 id = "tasteRatingTitle"> Taste Rating</h2>

                {/* Input Fields */}
                <section className = "section">
                    <div className = "control">
                        <label className="label">MyAnimeList Username:</label>
                            <div className="field">
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

                            </div>

                            <button className = "button is-primary"
                            onClick={this.getTasteRating}>
                                Submit    
                            </button>

                        
                    </div>

                    


                </section>

                {/* Output Content */}
                <section className = "section">
                        {this.state.okResponse &&
                            <div className = "box">
                                <PieChart 
                                    data = {this.state.data}
                                />  
                            </div>
                        }
                </section>
            </div>
            
        )
    }
}

export default tasteRating