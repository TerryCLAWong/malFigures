import axios from 'axios'
import React, { Component }  from 'react'
import PieChart from './pieChart'
import './tasteRating.css'
import StringInput from '../../input/stringInput'
import NumericSelect from '../../input/numericSelect'
import {HandleInputStringChange, HandleOptionSelect} from '../../helpers/inputHelpers'


class tasteRating extends Component {   
    constructor(props) {
        super(props)

        this.state = {
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

        this.handleOptionSelect = HandleOptionSelect.bind(this)
        this.handleInputChange = HandleInputStringChange.bind(this)
    }

    componentDidMount() {
        this.optionsSetup()
    }

    optionsSetup = () => {
        var options = []
        
        for (let i = 1; i <= 10; i++) {
            let option = {
                value: i,
            }
            options.push(option)
        }
        this.setState({
            upperOptions: options,
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
                                    name = "userName"
                                    value = {this.state.userName}
                                    handler = {this.handleInputChange}
                                />
                            </div>
                        
                            <div className = "columns is-mobile"> {/* TODO change so that the selects look better on mobile */}

                                <div className="column is-one-fifth">
                                    <div className="field">
                                        <label className="label">Upper Score Bound</label>

                                        <NumericSelect
                                            id = "upper"
                                            handler = {this.handleOptionSelect}
                                            options = {this.state.upperOptions}
                                        />
                                    </div>
                                </div>

                                <div className="column is-one-fifth">
                                    <div className="field">
                                        <label className="label">Lower Score Bound</label>

                                        <NumericSelect
                                            id = "lower"
                                            handler = {this.handleOptionSelect}
                                            options = {this.state.lowerOptions}
                                        />
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