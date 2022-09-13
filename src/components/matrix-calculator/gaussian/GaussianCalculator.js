import PrintGaussianMatrices from './PrintGaussianMatrices';
let React = require('react');

class GaussianCalculator extends React.Component {
    /****************************** GAUSSIAN CALCULATOR ***************************
    * METHODS AND LOGIC FOR PERFORMING ROW OPERATIONS ON INDIVIDUAL MATRICES
    * WILL RETURN THE ELEMENTARY MATRICES ASSOCIATED
    * RETURNS THE IDENTITY MATRICES AND THEIR SUBSEQUENT ASSOCIATED OPERATIONS
    * BOTH ELEMENTARY AND IDENTITY OPERATIONS CAN BE REMOVED
    */
    state = {
        operationCount: 1, // Keeps track of the row operation number, start at 1 since store original at 0
        currentMatrix: this.props.matrixToRowOperateOn, // Keeps track of current matrix version
        // Array to save the matrices which have had row operations performed, as well as the operation
        rowOperatedMatrix: [{ matrix: this.props.matrixToRowOperateOn, operation: '' }],
        currentRowOperation: '', // Save the current row operation 
        identityOperationMatrix: [{
            matrix: this.getElementaryMatrix(this.props.matrixToRowOperateOn.length,
                this.props.matrixToRowOperateOn[0].length), operation: ''
        }], // Identity matrix operations
        elementaryMatrix: [{
            matrix: this.getElementaryMatrix(this.props.matrixToRowOperateOn.length,
                this.props.matrixToRowOperateOn[0].length), operation: ''
        }],
        showElementary: true, showIdentity: true// Toggle these on and off with the show buttons
    }

    // Called with any change to the row operation input (updates as user types)
    updateRowOperation = (e) => { this.setState({ currentRowOperation: e.target.value }); }
    onRowSubmit = () => { this.extractRowOperation(this.state.currentRowOperation); }
    extractRowOperation(operation) {
        // Operation should be in the form 'R1=R1+R2'
        let operationArray = operation.split('='); // Split array into R1, R1+R2
        let rowToOperateOn = operationArray[0].match(/\d/) - 1; // The row will be one less than written
        let newOperation = operationArray[1];// Operation in some form R1+R2
        // Take the current matrix form and perform the next operation
        let currentMatrix = this.state.rowOperatedMatrix[this.state.operationCount - 1]['matrix'];

        var newMatrix = [...currentMatrix]; // Create variable for new matrix

        // Get elementary matrix matching the size of this one
        let rowSize = newMatrix.length;
        let columnSize = newMatrix[0].length;
        let newElementaryMatrix = this.getElementaryMatrix(rowSize, columnSize);

        // Current identity matrix
        let identityMatrix = [...this.state.identityOperationMatrix[this.state.operationCount - 1]['matrix']];

        let operator = newOperation.match("[-+*/>]")[0]; // Get the row operation
        let rowOperator = newOperation.split(operator)[1]; // Get the row that is being used on the other

        // Perform the row operation on all the matrix types
        if (rowOperator.includes('*')) { // If are adding or subtracting multiple of a row
            this.addOrSubtractMultipleOfRow(newMatrix, rowToOperateOn, newOperation, operator);
            this.addOrSubtractMultipleOfRow(newElementaryMatrix, rowToOperateOn, newOperation, operator);
            this.addOrSubtractMultipleOfRow(identityMatrix, rowToOperateOn, newOperation, operator);
        } else {
            this.rowOperation(newMatrix, rowToOperateOn, newOperation, operator);
            this.rowOperation(newElementaryMatrix, rowToOperateOn, newOperation, operator);
            this.rowOperation(identityMatrix, rowToOperateOn, newOperation, operator);
        }

        /*************************** SET THE STATE *****************************/
        // Push the new matrix to the matrix holder (containing all forms of the matrix and its operations)
        let rowMatrices = JSON.parse(JSON.stringify(this.state.rowOperatedMatrix));
        rowMatrices[parseInt(this.state.operationCount)] = { matrix: newMatrix, operation: operation } // Add new matrix 

        let newIdentityMatrices = JSON.parse(JSON.stringify(this.state.identityOperationMatrix));
        newIdentityMatrices[parseInt(this.state.operationCount)] = { matrix: identityMatrix, operation: operation } // Add new matrix

        let elementaryMatrix = JSON.parse(JSON.stringify(this.state.elementaryMatrix));
        elementaryMatrix[parseInt(this.state.operationCount)] = { matrix: newElementaryMatrix, operation }

        this.setState(prevState => ({
            rowOperatedMatrix: rowMatrices,
            currentMatrix: rowMatrices[prevState.operationCount],
            identityOperationMatrix: newIdentityMatrices,
            operationCount: prevState.operationCount + 1,
            elementaryMatrix
        }))
    }
    getElementaryMatrix(rowSize, columnSize) {
        // Get the elemetary matrix, called in extractRowOperation
        let matrix = new Array(rowSize);

        for (let i = 0; i < columnSize; i++) {
            matrix[i] = new Array(columnSize).fill(0);
            matrix[i][i] = 1;
        }
        return matrix;
    }


    rowOperation(newMatrix, rowToOperateOn, newOperation, operation, returnVal) {
        // Perform 'operation' on the row 
        let newRow; // Holds the value for the new row
        if (operation === '+' || operation === '-' || operation === '>') { // If adding or subtraction
            // Extract the row value, one less than whats written
            let rowToOperate = (newOperation.split(operation)[1].match(/\d/)[0]) - 1;
            if (operation === '+') {
                newRow = newMatrix[rowToOperateOn].map((val, index) => parseInt(val) + parseInt(newMatrix[rowToOperate][index]));
            } else if (operation === '-') {
                newRow = newMatrix[rowToOperateOn].map((val, index) => parseInt(val) - parseInt(newMatrix[rowToOperate][index]));
            } else if (operation === '>') {
                // Switch the rows
                let rowToSwitch1 = [...newMatrix[rowToOperateOn]];
                let rowToSwitch2 = [...newMatrix[rowToOperate]];
                newMatrix[rowToOperateOn] = rowToSwitch2;
                newMatrix[rowToOperate] = rowToSwitch1;
            }
        } else { // If multiplication or division
            // Extract the row value, one less than whats written
            let operationInteger = parseInt(newOperation.split(operation)[1]);
            // Divide the values in selected row all the values to the current matrix
            if (operation === '*') {
                newRow = newMatrix[rowToOperateOn].map((val, index) => parseInt(val) * operationInteger);
            } else if (operation === '/') {
                newRow = newMatrix[rowToOperateOn].map((val, index) => parseInt(val) / operationInteger);
            }
        }
        if (operation !== '>') {
            // Add the operation row to the new matrix
            if (returnVal) return newRow; // addOrSubtractMultipleOfRow uses this when multiplying row
            else newMatrix[rowToOperateOn] = newRow;
        }
    }
    addOrSubtractMultipleOfRow(newMatrix, rowToOperateOn, newOperation, operation) {
        // Subtract/ add(depending on operation) a multiple of a row to another. Split at the operation sign, then pass in 
        let operationArray = newOperation.split(operation);
        // Find the row # which is multiplied then will be added or subtracted to another
        let multipliedRow = operationArray[1].match(/\d/)[0];
        // Multiply the row and save it to a variable
        let rowMultiplied = this.rowOperation(newMatrix, multipliedRow - 1, newOperation, '*', true);

        // Perform operation on all the values from rowMultiplied to their destination row
        if (operation === '+') {
            console.log(newMatrix[rowToOperateOn].map((val, index) => parseInt(val) + rowMultiplied[index]))
            newMatrix[rowToOperateOn] = newMatrix[rowToOperateOn].map((val, index) => parseInt(val) + rowMultiplied[index])
        } else if (operation === '-') {
            newMatrix[rowToOperateOn] = newMatrix[rowToOperateOn].map((val, index) => parseInt(val) - rowMultiplied[index])
        }
    }
    // Prevent or allow certain matrices to be shown when associated button pressed
    toggleElementaryMatrices = () => { this.setState(prevState => ({ showElementary: !prevState.showElementary })); }
    toggleIdentityMatrices = () => { this.setState(prevState => ({ showIdentity: !prevState.showIdentity })); }

    render() {
        return (
            <div id="gaussian-calculator" class="">
                <h1 id="gaussian-calculator-header">ENTER ROW OPERATIONS</h1>
                <div id="row-operation-container">
                    <input id="row-operation" type="text" onChange={this.updateRowOperation} />
                    <input id="row-operation-submit" type="submit" value="SUBMIT" onClick={this.onRowSubmit} />
                </div>
                <input id="elementary-matrix-show-button" type="submit" onClick={this.toggleElementaryMatrices} value="SHOW ELEMENTARY MATRICES" />
                <input id="identity-matrix-show-button" type="submit" onClick={this.toggleIdentityMatrices} value="SHOW IDENTITY MATRICES" />
                <input id="gaussian-matrix-submit" type="submit" value="DONE" onClick={e => this.props.returnRowOperatedMatrix(this.state.currentMatrix, this.state.rowOperatedMatrix)} />
                <PrintGaussianMatrices
                    rowOperatedMatrix={this.state.rowOperatedMatrix}
                    identityOperationMatrix={this.state.identityOperationMatrix}
                    operationCount={this.state.operationCount}
                    elementaryMatrix={this.state.elementaryMatrix}
                    showElementary={this.state.showElementary}
                    showIdentity={this.state.showIdentity}
                />
            </div>
        )
    }
}

export default GaussianCalculator;