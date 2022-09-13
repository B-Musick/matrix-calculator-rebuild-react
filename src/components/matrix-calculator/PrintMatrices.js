let React = require('react');

class PrintMatrices extends React.Component {
    state = { matrixHolder: this.props.matrixHolder, matrixCount: this.props.matrixCount, ALPHABET: 'abcdefghijklmnopqrstuvwxyz' }
    componentWillReceiveProps(nextProps) {
        this.setState({ matrixHolder: nextProps.matrixHolder, matrixCount: nextProps.matrixCount });
    }

    printMatrices = () => {
        // Called in render()
        // Loop through matrixes and print them to the screen
        let matrixBoxes = []; // Holds all the matrix box containers
        let matrixContainer = []; // Holds individual table
        for (let mtx = 0; mtx < this.state.matrixCount; mtx++) {
            // Set the title of the matrix
            let text = '';
            if (this.state.matrixHolder[mtx]['title']) text = this.state.matrixHolder[mtx]['title'];

            // Add matrix header with letter
            matrixContainer.push(<h3 dangerouslySetInnerHTML={{ __html: `MATRIX ${this.state.ALPHABET.charAt(mtx).toUpperCase()} ${text}` }} key={`matrix${mtx}Title`}></h3>);
            let tableRows = []; // Hold the individual <tr>
            for (let row = 0; row < this.state.matrixHolder[mtx]['matrix'].length; row++) {
                // Loop through rows of matrix
                let tableRow = []; // Holds individual row
                for (let col = 0; col < this.state.matrixHolder[mtx]['matrix'][0].length; col++) {
                    // Loop through each column value in the matrix row
                    tableRow.push(<td key={`matrix${mtx}Row${row}Col${col}`}>{this.state.matrixHolder[mtx]['matrix'][row][col]}</td>)
                }
                // Append tr to row holder
                tableRows.push(<tr key={`matrix${mtx}Row${row}`} id={`print-matrix-${mtx}-row-${row}`} className="matrix-print-row">{tableRow}</tr>);
                tableRow = []; // Clear row array for next iteration
            }
            matrixContainer.push(<table key={`matrix-table-${mtx}`} className="matrix"><tbody>{tableRows}</tbody></table>);
            matrixBoxes.push(<div key={`matrix-box-${mtx}`} id="matrix-calculator-box">{matrixContainer}</div>); // Push this single matrix to array holding all matrices
            matrixContainer = []; // Clear for next matrix
        }
        return matrixBoxes;
    }

    render() {
        return (
            <div id="show-matrices-container">
                {this.printMatrices()}
            </div>
        )
    }
}

export default PrintMatrices;