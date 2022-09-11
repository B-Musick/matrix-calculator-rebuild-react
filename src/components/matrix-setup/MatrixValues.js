let React = require('react');

class MatrixValues extends React.Component {
    // This will show inputs to get the values for the matrices
    state = {
        matrixHolder: this.props.matrixHolder // Matrix holder skeleton set in app (set initial state)
    }

    /**
     * handleSizeInputs() 
     * 
     * @description will print all the inputs depending on the row and size 
     * of each matrix set in MatrixSize, values which are held in matrixHolder state value.
     * 
     * @returns 
     */
    handleSizeInputs = () => {
        // Called in render
        // Loop through matrix counts and set their associated sizes
        let individualMatrices = []; // Hold the individual matrices
        let rows = []; // Hold the row inputs for the matrix

        for (let i = 0; i < this.props.matrixCount; i++) {
            // Loop throught the amount of matrices, create the matrix of inputs,
            // this will give the matrix number
            individualMatrices.push(<h2 key={`matrix${i}Title`}>{`matrix ${this.props.ALPHABET.charAt(i).toUpperCase()}`}</h2>); // Matrix header

            let singleRow = []; // Hold an individual row

            for (let row = 0; row < parseInt(this.props.initialMatrixDimensions[i]['rows']); row++) {
                // Row for the matrix
                for (let col = 0; col < parseInt(this.props.initialMatrixDimensions[i]['cols']); col++) {
                    // Add the input for this row
                    singleRow.push(<input key={`matrix${i}Row${row}Col${col}`} className={`row-${row} col-${col}`} id={`${i}${row}${col}`} onChange={e => this.handleChange(e)} />)
                }
                rows.push(<div key={`matrix${i}Row${row}`} className="row">{singleRow}</div>) // Add this row to the array of rows
                singleRow = []; // Clear for next iteration
            }
            individualMatrices.push(<div key={`matrix${i}Container`} id={`matrix-${i}`} className="matrix matrix-container">{rows}</div>) // Add the finished matrix to array
            rows = []; // Clear the array for next iteration
        }
        return individualMatrices;
    }

    /**
     * 
     * @description handleChange(e) is called from onChange event listeners on the 
     * input where the state of matrixHolder is updated. When user submits, 
     * these matrices in matrixHolder are passed back up to App through setInitialState prop method
     * @param {*} e 
     */
    handleChange = (e) => {
        // Updates this.state.matrixHolder with input from user
        let newState = JSON.parse(JSON.stringify(this.state.matrixHolder));
        let c = e.target.id.split(''), matrix = parseInt(c[0]);
        let row = parseInt(c[1]), col = parseInt(c[2]), newValue = e.target.value;

        // Set the new state
        newState[matrix]['matrix'][row][col] = parseInt(newValue);

        // setMatrixHolder[matrix][row][col] = newValue;
        this.setState({ matrixHolder: newState })
    }

    render() {
        return (
            <div className="inputs-container" id="matrix-value-input-container">
                {/* Show the matrices and inputs for them */}
                <form onSubmit={e => this.props.setInitialState(this.props.inputsShown, this.state.matrixHolder)}>
                    {this.handleSizeInputs()}
                    <input type="submit" id="matrix-submit-button" />
                </form>
            </div>
        )
    }
}

export default MatrixValues;

