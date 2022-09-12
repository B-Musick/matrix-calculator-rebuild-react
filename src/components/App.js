/**
 * Description:         
 *      1. This is where initial state is set. 
 *      - MatrixCount -> MatrixSize -> MatrixValues 
 *      - component are called in sucession where setInitialState() method changes which is shown
        through changing inputsShown state variable.
        - After these three the final one called is MatrixCalculator. 
    @param matrixHolder Holds the matrix values the user defines in an array. This is set initially in MatrixValues
    @param initialMatrixDimensions Holds the initial sizes of the matrices
 */

import MatrixCount from './matrix-setup/MatrixCount.js';
import MatrixSize from './matrix-setup/MatrixSize.js';
import MatrixValues from './matrix-setup/MatrixValues.js';
import MatrixCalculator from './matrix-calculator/MatrixCalculator.js';

let React = require('react');

class App extends React.Component {
    state = {
        ALPHABET:'abcdefghijklmnopqrstuvwxyz', // Used to give the matrices letter labels
        matrixCount:undefined, // Holds the amount of matrices
        inputsShown:'matrix-count', // Used to determine which inputs shown to screen
        initialMatrixDimensions:{}, // Defines the first matrix sizes
        matrixHolder:{} // Holds the matrices
    };

    setInitialState=(variable,value)=>{
        // Passed in values from either MatrixCount, MatrixSize or MatrixValues
        if(variable==='matrix-count') this.setState({matrixCount:value,inputsShown:'matrix-size'});

        else if(variable==='matrix-size'){
            // Set the initial matrixHolder skeleton for MatrixValues
            let initialMatrixHolder = {};
            value.forEach((val, index) => {
                // Set the skeleton, where each matrix has 'title' and 'matrix' keys
                initialMatrixHolder[index] = {title:'', matrix:new Array(parseInt(val['rows']))
                    .fill(new Array(parseInt(val['cols'])).fill(0))};
            });
            this.setState({initialMatrixDimensions: value, inputsShown: 'matrix-values',matrixHolder: initialMatrixHolder})
        } 
        // Matrix calculator called with the initial matrices held in 'matrixHolder'
        else if (variable === 'matrix-values') this.setState({inputsShown: 'matrix-calculator',matrixHolder:value })
    }

    render() {
        // If the current window shown is asking user for matrix count
        if (this.state.inputsShown === 'matrix-count') {
            return (<MatrixCount
                setInitialState={this.setInitialState}
                inputsShown={this.state.inputsShown} />)
        }

        // If the current windo is shown is asking for each matrices size
        if (this.state.inputsShown === 'matrix-size') {
            return (<MatrixSize
                inputsShown={this.state.inputsShown}
                ALPHABET={this.state.ALPHABET}
                matrixCount={this.state.matrixCount}
                setInitialState={this.setInitialState} />)
        }

        // If current window is shown is asking for the values for each matrix
        if (this.state.inputsShown === 'matrix-values') { return (<MatrixValues
            setInitialState={this.setInitialState}
            matrixHolder={this.state.matrixHolder}
            inputsShown={this.state.inputsShown}
            matrixCount={this.state.matrixCount}
            ALPHABET={this.state.ALPHABET}
            initialMatrixDimensions={this.state.initialMatrixDimensions} />)};

        // If the user input the values to the matrix, show the matrix caclulator
        if (this.state.inputsShown === 'matrix-calculator') { return (<MatrixCalculator
            matrixHolder={this.state.matrixHolder}
            inputsShown={this.state.inputsShown}
            matrixCount={this.state.matrixCount}
            ALPHABET={this.state.ALPHABET} />) }
    }
}

export default App;