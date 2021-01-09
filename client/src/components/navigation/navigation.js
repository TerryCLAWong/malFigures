import React, { Component }  from 'react';
import {NavLink} from "react-router-dom";
class Navigation extends Component {
    render () {
        return (
            <div className = "navigation">
                <ul>
                    <li> <NavLink to="/f1">feature1</NavLink> </li>
                    <li> <NavLink to="/f2">feature2</NavLink> </li>
                </ul>
            </div>
        )
    }
}

export default Navigation