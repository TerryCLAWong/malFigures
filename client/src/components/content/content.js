import React, { Component }  from 'react';
import {Route} from "react-router-dom";
//Features
import Feature1 from "../features/commonStudios"
import Feature2 from "../features/feature2"


class Content extends Component {
    render () {
        return (
            <div className = "content">
                <Route path="/f1" component={Feature1}/>
                <Route path="/f2" component={Feature2}/>
            </div>
        )
    }
}

export default Content