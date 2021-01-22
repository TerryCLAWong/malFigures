import React, { Component }  from 'react';
import {NavLink} from "react-router-dom";

class Navigation extends Component {
    render () {
        return (
            <div>
                <aside className = "menu">
                    <p className = "menu-label">
                        Features
                    </p>
                        <ul className = "menu-list">
                            <li> <NavLink to="/commonStudios">Common Studios</NavLink> </li>

                            <li> <NavLink to="/f2">feature2</NavLink> </li>

                        </ul>

                    <p className ="menu-label">
                        Contact
                    </p>
                </aside>
                
            </div>
        )
    }
}

export default Navigation