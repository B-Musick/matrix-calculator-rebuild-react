import PrintCofactors from './PrintCofactorMatrices';

let React = require('react');
let PropTypes = require('prop-types');

// Components

class CofactorCalculator extends React.Component {
    state = {
        matrixToCofactor: this.props.matrixToCofactor,
        determinant: undefined,
        minors: {},
        cofactors: {}
    }
    // Called with any change to the row operation input (updates as user types)
    updateOperation = (e) => { this.setState({ currentOperation: e.target.value }); }
    onSubmit = () => { this.extractOperation(this.state.currentOperation); }

    extractOperation = () => {
        // So the operation can either be M11 where M means getting the minor of row 1 and column 1
        // thus gtting the determinant of the matrix with row 1 and column 1 gone
        let operationArray = this.state.currentOperation.split('');
        let operation = operationArray[0];
        // Subtract 1 from users input since using humans speak for numbering
        let rowToRemove = parseInt(operationArray[1]) - 1;
        let columnToRemove = parseInt(operationArray[2]) - 1;
        // Create deep copy of the matrix which will be cofactored
        let matrix = this.state.matrixToCofactor.map(function (arr) {
            return arr.slice();
        });

        // Calculate the minor
        matrix = this.removeMinorRowColumn(matrix, rowToRemove, columnToRemove);
        let minor = this.calculateMinor(matrix);

        if (operation === 'M') {
            // Return the minor calculated
            // Add this to the state
            let minors = JSON.parse(JSON.stringify(this.state.minors));
            minors[this.state.currentOperation] = minor;

            this.setState({ minors });
        } else if (operation === 'C') {
            // Get the cofactor, it is the result of multiplying the minor by 
            // the exponent being the row/column and taken to -1
            let cofactor = minor * ((-1) ** ((rowToRemove + 1) + (columnToRemove + 1)));
            // Add this to the state
            let cofactors = JSON.parse(JSON.stringify(this.state.cofactors));
            cofactors[this.state.currentOperation] = cofactor;

            this.setState({ cofactors });
        } else if (operation === 'A') {
            // This will give the adjoint
            // Loop through all values in the matrix and get the cofactor for each

        }
    }
    removeMinorRowColumn = (matrix, rowToRemove, columnToRemove) => {
        // Remove the row assigned in 'M##'
        matrix.splice(rowToRemove, 1);
        matrix.forEach(row => {
            // Remove the column values assigned 
            row.splice(columnToRemove, 1);
        });
        return matrix;
    }
    calculateMinor = (matrix) => {
        let minor;
        // If matrix was 3x3 and now length two. If matrix is size 3 then take out row and column provided
        // Then get the determinant of the 2x2 matrix
        if (matrix.length === 2) minor = this.matrixSizeTwoByTwoDeterminant(matrix);
        // If matrix was 4x4, now 3x3 
        else if (matrix.length === 3) minor = this.matrixSizeThreeByThreeDeterminant(matrix);
        return minor;
    }
    matrixSizeTwoByTwoDeterminant = (matrix) => {
        return (matrix[0][0] * matrix[1][1]) - (matrix[0][1] * matrix[1][0]);
    }
    matrixSizeThreeByThreeDeterminant = (matrix) => {
        let length = matrix.length - 1;
        let minor = 0;
        for (let i = 0; i < matrix[0].length; i++) {
            let ad = (matrix[1][(i + 1) % (length + 1)] * matrix[2][(i + 2) % (length + 1)]);
            let bc = (matrix[1][(i + 2) % (length + 1)] * matrix[2][(i + 1) % (length + 1)]);
            if (i % 2 === 0) minor += (matrix[0][i] * (ad - bc))
            // Since using modulo, need to switch bc-ad since moves to start index 
            else minor -= (matrix[0][i] * (bc - ad)) // For odd index, need to make it negative
        };
        return minor;
    }

    render() {
        return (
            <div id="cofactor-calculator" className="">
                <h1 id="cofactor-calculator-header">ENTER COFACTOR OPERATIONS</h1>
                <div id="cofactor-operation-container">
                    <input id="cofactor-operation" type="text" onChange={this.updateOperation} />
                    <input id="cofactor-operation-submit" type="submit" value="SUBMIT" onClick={this.onSubmit} />
                </div>
                <input id="elementary-matrix-show-button" type="submit" onClick={this.toggleOperations} value="SHOW OPERATION" />
                <input id="cofactor-matrix-submit" type="submit" value="DONE" onClick={e => this.props.returnToMatrixCalculator()} />
                <PrintCofactors minors={this.state.minors} cofactors={this.state.cofactors} />
            </div>
        )
    }
}

export default CofactorCalculator;