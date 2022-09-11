/**
 *  DESCRIPTION:
 *      2. User inputs amount of matrices they want, matrixCount state is set and 
 *      passed back up to App through setInitialState after click submit.
 */
import React from 'react';

let PropTypes = require('prop-types');

class MatrixCount extends React.Component {
    /** 
     * Asks user to input how many matrices they initially want created. 
     * Saves the amount to matrixCount variable passed in through props
     */

    // Initially, the matrix count is unknown until user inputs
    state={matrixCount:''}; 

    render() {
        return (
            <div id="matrix-selection-container">
                <div className="inputs-container" id="matrix-amount-input-container">
                    <p>How many matrices?</p>
                    {/* When user inputs, then set the matrix count state to this
                    - this.state comes from React.Component 

                    FLOW:
                    - User types input
                    - Callback invoked
                    - Call setState with new value
                    - Component rerenders(Any time setState is called then the component rerenders)
                    - Input is told what value is coming in from state (value is shoved into the input)
                    */}
                    
                    <input type="text" id="matrix-count" value={this.state.matrixCount}
                        onChange={(e)=>this.setState({matrixCount: e.target.value})} />
                        
                    <input type="submit" value="Submit" id="matrix-count-button" 
                        onClick={e => this.props.setInitialState(this.props.inputsShown, parseInt(this.state.matrixCount))}/>
                </div>
            </div>
        )
    }
}

MatrixCount.propTypes = {
    inputsShown: PropTypes.string,
    matrixCount: PropTypes.number,
    setInitialState: PropTypes.func,
}

export default MatrixCount;