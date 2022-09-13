import CofactorCalculator from './cofactor/CofactorCalculator';
import GaussianCalculator from './gaussian/GaussianCalculator';

let React = require('react');

class CalculatorInput extends React.Component {
    state = {
        matrixHolder: this.props.matrixHolder, matrixCount: this.props.matrixCount, formula: '', ALPHABET: 'abcdefghijklmnopqrstuvwxyz',
        // Following are accessed in 'extractCalculation'
        matrixOperations: new Map([
            ['+', (matrixOne, matrixTwo, addedText, operator) => { this.addMatrices(matrixOne, matrixTwo, addedText, operator); }],
            ['-', (matrixOne, matrixTwo, addedText, operator) => { this.subtractMatrices(matrixOne, matrixTwo, addedText, operator); }],
            ['*', (matrixOne, matrixTwo, addedText, operator) => { this.multiplyMatrices(matrixOne, matrixTwo, addedText, operator); }],
            ['t', (matrixOne, matrixTwo, addedText, operator) => { this.transpose(matrixOne, matrixTwo, addedText, operator); }],
            ['e', (matrixOne, matrixTwo, addedText, operator) => { this.trace(matrixOne, matrixTwo, addedText, operator); }],
            ['R', (matrixOne, matrixTwo, addedText, operator) => { this.setState({ calculatorShown: 'gaussian-calculator', matrixToRowOperateOn: matrixOne }) }],
            ['C', (matrixOne, matrixTwo, addedText, operator) => {
                // Has to be a square matrix to perform cofactor determinants
                if (matrixOne.length === matrixOne[0].length) this.setState({ calculatorShown: 'cofactor-calculator', matrixToCofactor: matrixOne })
            }]
        ]),
        calculatorShown: 'matrix-calculator',
        matrixToRowOperateOn: [] // This will hold the matrix to perform operations on
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        this.setState({ matrixHolder: nextProps.matrixHolder, matrixCount: nextProps.matrixCount })
    }

    // Takes the formula and saves it to the state
    handleChange = (e) => { this.setState({ formula: e.target.value }) }

    // When user submits the formula
    handleFormulaSubmit = (e) => { e.preventDefault(); this.extractCalculation(); }

    // Matrix Operations
    extractCalculation = () => {
        // Extract the first matrix
        let matrixOne = this.state.matrixHolder[this.state.ALPHABET.indexOf(this.state.formula.charAt(0).toLowerCase())]['matrix'];
        let matrixTwo;
        if (this.state.formula.charAt(2)) {
            // If there is a second matrix to operate with
            matrixTwo = this.state.matrixHolder[this.state.ALPHABET.indexOf(this.state.formula.charAt(2).toLowerCase())]['matrix'];
        }

        // Extract the operation
        let operator = this.state.formula.charAt(1);
        let firstMatrixLetter = this.state.formula.charAt(0);
        let secondMatrixLetter;
        if (this.state.ALPHABET.includes(operator)) secondMatrixLetter = operator
        else secondMatrixLetter = `${operator}` + this.state.formula.charAt(2)

        // Operations stored in the state
        this.state.matrixOperations.get(operator)(matrixOne, matrixTwo, '(' + firstMatrixLetter + secondMatrixLetter + ")", operator);
    }

    matrixOperation = (mtx1, mtx2, text, operation) => {
        // Add, subtract. Depends on which operation passed in
        let newMtx = [];
        // Matrices must be the same size to add together
        for (let row = 0; row < mtx1.length; row++) {
            let rowArray = [];
            for (let col = 0; col < mtx1[0].length; col++) {
                // Add/subtract each value together at the individual column
                if (operation === '+') rowArray.push(parseInt(mtx1[row][col]) + parseInt(mtx2[row][col]));
                else if (operation === '-') rowArray.push(parseInt(mtx1[row][col]) - parseInt(mtx2[row][col]));
            }
            // Add the new row to the array
            newMtx.push(rowArray);
        }
        // Save to matrixHolder and increment the matrix count
        this.saveMatrix(newMtx, text);
    }

    saveMatrix = (newMtx, text) => {
        // Add the matrix to be used later, called in the matrix Operations
        let newMatrixHolder = JSON.parse(JSON.stringify(this.state.matrixHolder));
        newMatrixHolder[parseInt(this.state.matrixCount)] = { title: text, matrix: newMtx } // Add new matrix 

        // Update MatrixCalculator state, state is saved in MatrixCalculator
        this.props.updateMatrixHolder(newMatrixHolder, parseInt(this.state.matrixCount) + 1);
    }


    addMatrices = (mtx1, mtx2, text, operation) => {
        if (mtx1.length === mtx2.length && mtx1[0].length === mtx2[0].length) {
            // Only perform operation if matrices are the same size
            this.matrixOperation(mtx1, mtx2, text, operation);
        }
    }

    subtractMatrices = (mtx1, mtx2, text, operation) => {
        if (mtx1.length === mtx2.length && mtx1[0].length === mtx2[0].length) {
            this.matrixOperation(mtx1, mtx2, text, operation);
        }
    }

    multiplyMatrices(mtx1, mtx2, text) {
        let newMtx = [];
        if (mtx1[0].length === mtx2.length) {
            // Columns of the first matrix must match the amount of rows in the second
            for (let row = 0; row < mtx1.length; row++) {
                let rowArray = [];
                for (let col = 0; col < mtx2[0].length; col++) {
                    let total = 0;
                    for (let mtx2row = 0; mtx2row < mtx2.length; mtx2row++) {
                        // Multiply values in the row of the first matrix by those in the column of second and add them together
                        total += (parseInt(mtx1[row][mtx2row]) * parseInt(mtx2[mtx2row][col]));
                    }
                    // Add each value together at the individual column
                    rowArray.push(total);
                }
                // Add the new row to the array
                newMtx.push(rowArray);
            }
        }
        this.saveMatrix(newMtx, text);
    }

    transpose(mtx, mtx2, text, operator) {
        // Type in the matrix number then 't' after (0t)
        let newMtx = [];

        // Matrices must be the same size to add together
        for (let row = 0; row < mtx.length; row++) {
            for (let col = 0; col < mtx[0].length; col++) {
                // Create a new row to transpose the column val to the row
                if (row === 0) newMtx.push([]);
                // Push the value from the column to the row of same place
                newMtx[col].push(parseInt(mtx[row][col]));
            }
        }
        this.saveMatrix(newMtx, text);
    }

    trace(mtx, mtx2, text, operator) {
        let total = 0;
        if (mtx.length === mtx[0].length) {
            // Must be an nxn matrix
            for (let i = 0; i < mtx.length; i++) {
                // Add the eigenvalue to the totals
                total += parseInt(mtx[i][i]);
            }
        }
        alert('Trace is ' + total + ' for Matrix ' + text);
    }
    returnRowOperatedMatrix = (matrix, operators) => {
        // When the user completes row operations for this matrix, pass it back up to CalculatorInput
        // which should pass it back up to MatrixCalculator and save it to matrixHolder
        let text = '(<br/>';
        // Dont use the first index because there is no row operation on it
        operators.forEach((obj, index) => { if (index > 0) text += `${obj['operation']}<br/>` });
        this.setState({ calculatorShown: 'matrix-calculator' })
        console.log(text);
        this.saveMatrix(matrix['matrix'], text + ')')
    }
    returnToMatrixCalculator = () => {
        // Called from CofactorCalculator
        this.setState({ calculatorShown: 'matrix-calculator' });
    }
    render() {
        if (this.state.calculatorShown === 'matrix-calculator') {
            return (
                <div id="matrix-calculator">
                    <input id="formula" type="text" onChange={e => this.handleChange(e)} />
                    <input id="formula-submit" type="submit" value="Submit" onClick={e => this.handleFormulaSubmit(e)} />
                </div>
            )

        } 
        else if (this.state.calculatorShown === 'gaussian-calculator') {
            // Returned if user types in matrix letter followed by 'R' into input
            return (
                <GaussianCalculator matrixToRowOperateOn={this.state.matrixToRowOperateOn} returnRowOperatedMatrix={this.returnRowOperatedMatrix} />
            )
        } 
        else if (this.state.calculatorShown === 'cofactor-calculator') {
            // User types in matrix letter followed by 'C' in input
            return (
                // Matrix must be square
                <CofactorCalculator matrixToCofactor={this.state.matrixToCofactor} returnToMatrixCalculator={this.returnToMatrixCalculator} />
            )
        }
    }
}

export default CalculatorInput;