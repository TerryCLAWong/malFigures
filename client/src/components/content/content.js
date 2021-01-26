import React, { Component }  from 'react';
import {Route} from "react-router-dom";
//Features
import commonStudios from "../features/commonStudios/commonStudios"
import tasteRating from "../features/tasteRating/tasteRating"


class Content extends Component {
    render () {
        return (
            <div>
                <Route path="/commonStudios" component={commonStudios}/>
                <Route path="/tasteRating" component={tasteRating}/>
            </div>
        )
    }
}

export default Content