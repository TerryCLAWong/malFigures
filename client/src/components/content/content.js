import React, { Component }  from 'react';
import {Route} from "react-router-dom";
//Features
import commonStudios from "../features/commonStudios/commonStudios"
import Feature2 from "../features/feature2"


class Content extends Component {
    render () {
        return (
            <div className = "content">
                <Route path="/commonStudios" component={commonStudios}/>
                <Route path="/f2" component={Feature2}/>
            </div>
        )
    }
}

export default Content