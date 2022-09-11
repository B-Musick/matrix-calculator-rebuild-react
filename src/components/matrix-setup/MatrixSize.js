/**
 *  DESCRIPTION: 
 *      3. User inputs the size for each individual matrix,  these inputs printed 
 *      in printInputs() which calls printMatrixInputs(), the amount of inputs 
 *      depending on matrixCount. printInputs() is called in render(). updateInput 
 *      is called as user types (onChange event listener  in the inputs in 
 *      printMatrixInputs) thus making sure state is changed properly when submitted.
 */
let React = require('react');

class MatrixSize extends React.Component {
    /* Provides the inputs for user to define the matrix row and columns sizes. 
     * Create matrixCount many matrices and fill all rows and columns with zeroes. */
    state = { matrixDimensions: new Array(parseInt(this.props.matrixCount)).fill({ cols: 0, rows: 0 }) }

    /**
     * printMatrixInputs
     * 
     * @description methods is called from printInputs() method
     * @param {*} matrixNumber The associated index number of the matrix to which 
     *             the row and column count will be defined by the user
     * @returns 
     */
    printMatrixInputs = (matrixNumber) => {
        // Called in printInputs method
        return (
            // https://reactjs.org/docs/lists-and-keys.html
            <div key={`matrixContainer${matrixNumber}`} className="matrix-size-containers">
                {/* For each matrix, show inputs for user to decribe dimensions 
                https://stackoverflow.com/questions/42913734/how-to-pass-down-input-value-during-onsubmit-in-react*/}
                <span>Rows: </span><input id={"matrix-" + matrixNumber + '-row-size'} onChange={this.updateInput} className={`matrix-row ${matrixNumber}`}></input><br />
                <span>Columns: </span><input id={"matrix-" + matrixNumber + '-col-size'} onChange={this.updateInput} className={`matrix-col ${matrixNumber}`}></input><br />
            </div>
        )
    }

    /**
     * printInputs
     * 
     * @returns 
     */
    printInputs = () => {
        // Adds title to each and is called in the render() method
        let matrixInputs = [];

        for (let i = 0; i < this.props.matrixCount; i++) {
            // For each matrix, add letter as title
            matrixInputs.push(<h2 key={i}>{`matrix ${this.props.ALPHABET.charAt(i).toUpperCase()}`}</h2>);
            // Creates the inputs for row and column for the associated matrix
            // so the user can define their size
            matrixInputs.push(this.printMatrixInputs(i));
        };
        return matrixInputs;
    }

    /**
     * updateInputs
     * 
     * @param {*} e 
     * 
     */
    updateInput = (e) => {
        e.preventDefault();
        let classNamesArray = e.target.className.split(' '); // Splits (matrix-row 0)
        let value = e.target.value; // Get the value passed in through input
        let matrixNumber = classNamesArray[1]; // Save the matrix number

        if (classNamesArray[0] === 'matrix-row') {
            // Set the state of this matrices row
            this.setState(prevState => ({
                matrixDimensions: prevState.matrixDimensions.map(
                    (el, index) => {
                        // Check that the current index is the same as the matrixNumber which is being defined
                        if (parseInt(index) === parseInt(matrixNumber)) return { col: el.cols, rows: value }
                        else return el
                    })
            }))
        };

        if (classNamesArray[0] === 'matrix-col') {
            // Set the state of this matrices column
            this.setState(prevState => ({
                matrixDimensions: prevState.matrixDimensions.map(
                    (el, index) => {
                        // Check that the current index is the same as the matrixNumber which is being defined
                        if (parseInt(index) === parseInt(matrixNumber)) return { cols: value, rows: el.rows }
                        else return el
                    })
            }))
        };
    }

    /**
     * render
     * 
     * @returns 
     */
    render() {
        return (
            <div className="inputs-container" id="matrix-size-input-container">
                <p>How big will the matrices be?</p>
                {/* this.props.inputsShown will be holding value 'matrix-size', this will tell
                setInitialState to now use value matrixDimensions and it will use this 
                to switch to the next screen (matrix-values).  */}
                <form onSubmit={e => this.props.setInitialState(this.props.inputsShown, this.state.matrixDimensions)}>
                    {this.printInputs()}
                    <input type="submit" id="matrix-dimension-submit" />
                </form>
            </div>
        )
    }
}

export default MatrixSize;

