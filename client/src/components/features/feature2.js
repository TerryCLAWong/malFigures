import React, { Component }  from 'react';
import Select from 'react-select';


class feature2 extends Component {
    render () {
        return (
            <div>
                <h2>CONTACT</h2>
                <p>today i went to the mall and had a great time trying out lots of different
                    types of ice cream. my favorite was caramel. schnozz
                </p>
                <Select
                    options = {[{label : "east", value: 1}, {label : "west", value: 2}, {label : "north", value: 3}]}
                />

                
            </div>
        )
    }
}

export default feature2