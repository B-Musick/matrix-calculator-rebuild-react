let React = require('react');

class PrintGaussianMatrices extends React.Component {
    state = {
        rowOperatedMatrix: this.props.rowOperatedMatrix,
        identityOperationMatrix: this.props.identityOperationMatrix,
        operationCount: this.props.operationCount,
        elementaryMatrix: this.props.elementaryMatrix
    }

    componentWillReceiveProps = (nextProp) => {
        // Since receive rows multiple times, need this
        this.setState({
            rowOperatedMatrix: nextProp.rowOperatedMatrix,
            identityOperationMatrix: nextProp.identityOperationMatrix,
            operationCount: nextProp.operationCount,
            elementaryMatrix: nextProp.elementaryMatrix
        });
    }

    printMatrix = (mtx, className, text, matrixHolder) => {
        // This will print the matrix passed in
        // Set the title of the matrix
        let matrixContainer = []; // Holds individual table

        // Add matrix header with letter
        matrixContainer.push(<h3 key={`matrix${mtx}Title`}>{`${text}`}</h3>);
        let tableRows = []; // Hold the individual <tr>
        for (let row = 0; row < matrixHolder[mtx]['matrix'].length; row++) {
            // Loop through rows of matrix

            let tableRow = []; // Holds individual row
            for (let col = 0; col < matrixHolder[mtx]['matrix'][0].length; col++) {
                // Loop through each column value in the matrix row
                tableRow.push(<td key={`matrix${mtx}Row${row}Col${col}`}>{matrixHolder[mtx]['matrix'][row][col]}</td>)
            }
            // Append tr to row holder
            tableRows.push(<tr key={`matrix${mtx}Row${row}`} id={`print-matrix-${mtx}-row-${row}`} className="matrix-print-row">{tableRow}</tr>);
            tableRow = []; // Clear row array for next iteration
        }
        matrixContainer.push(<table key={`matrix-table-${mtx}`} className="matrix"><tbody>{tableRows}</tbody></table>);
        return matrixContainer;
    }
    printMatrices = () => {
        // Print the row operated matrix, elementary and identity matrices using printMatrix
        // Loop through matrixes and print them to the screen, called in render()
        let matrixBoxes = []; // Holds all the matrix box containers

        for (let mtx = 0; mtx < this.state.rowOperatedMatrix.length; mtx++) {
            // Set the title of the matrix
            let text = this.state.rowOperatedMatrix[mtx]['operation']
            // Print the regular matrices, identity and elementary as well
            let matrixContainer = this.printMatrix(mtx, '', text, this.state.rowOperatedMatrix);
            let identityMatrices = this.printMatrix(mtx, '', `I${mtx}`, this.state.identityOperationMatrix);
            let elementaryMatrixNew = this.printMatrix(mtx, '', `E${mtx}`, this.state.elementaryMatrix)

            // Add matrices to array which will be printed. Can be turned on and off from buttons in GaussianCalculator
            matrixBoxes.push(<div key={`matrix-box-${mtx}`} className={"matrix-calculator-box"}>{matrixContainer}</div>); // Push this single matrix to array holding all matrices
            if (this.props.showElementary) matrixBoxes.push(<div key={`elementaryMatrix-box-${mtx}`} className={"elementary-matrix-container"}>{elementaryMatrixNew}</div>); // Push this single matrix to array holding all matrices
            if (this.props.showIdentity) matrixBoxes.push(<div key={`identityMatrix-box-${mtx}`} className={"identity-matrix-container"}>{identityMatrices}</div>); // Push this single matrix to array holding all matrices
        }
        return matrixBoxes;
    }

    render() { return (<div id="gaussian-grid">{this.printMatrices()}</div>) }
}

export default PrintGaussianMatrices;