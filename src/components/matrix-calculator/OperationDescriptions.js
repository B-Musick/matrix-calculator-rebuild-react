let React = require('react');

class OperationDescriptions extends React.Component {
    state = { matrixHolder: this.props.matrixHolder, matrixCount: this.props.matrixCount,
        additionDescShown: "shown-description", 
        subtractionDescShown: "hidden-description",
        multiplicationDescShown: "hidden-description",
        transposeDescShown: "hidden-description",
        traceDescShown: "hidden-description",
        rowOperationsDescShown: "hidden-description",
        cofactorDescShown: "hidden-description",
        shownObject: {
            "hidden-description":"+",
            "shown-description":"-"
        }    
    };
    
    toggleDescriptionShown=(e)=>{
        let headerID = e.target.id;
        let splitHeaderID = headerID.split('-');

        switch(headerID){
            case "addition-instruction-header":
                this.state.additionDescShown === "hidden-description" ?
                    this.setState({ additionDescShown: "shown-description" }) :
                    this.setState({ additionDescShown: "hidden-description" });
                    break;
            case "subtraction-instruction-header":
                this.state.subtractionDescShown === "hidden-description" ?
                    this.setState({ subtractionDescShown: "shown-description" }) :
                    this.setState({ subtractionDescShown: "hidden-description" });
                    break;
            case "multiplication-instruction-header":
                this.state.multiplicationDescShown === "hidden-description" ?
                    this.setState({ multiplicationDescShown: "shown-description" }) :
                    this.setState({ multiplicationDescShown: "hidden-description" });
                    break;
            case "trace-instruction-header":
                this.state.traceDescShown === "hidden-description" ?
                    this.setState({ traceDescShown: "shown-description" }) :
                    this.setState({ traceDescShown: "hidden-description" });
                break;
            case "transpose-instruction-header":
                this.state.transposeDescShown === "hidden-description" ?
                    this.setState({ transposeDescShown: "shown-description" }) :
                    this.setState({ transposeDescShown: "hidden-description" });
                break;
            case "rowoperations-instruction-header":
                this.state.rowOperationsDescShown === "hidden-description" ?
                    this.setState({ rowOperationsDescShown: "shown-description" }) :
                    this.setState({ rowOperationsDescShown: "hidden-description" });
                break;
            case "cofactor-instruction-header":
                this.state.cofactorDescShown === "hidden-description" ?
                    this.setState({ cofactorDescShown: "shown-description" }) :
                    this.setState({ cofactorDescShown: "hidden-description" });
                break;
            default:
                break;
        }
    }
    
    render() {
        return (
            <div id="matrix-calculator-operations" class="inputs-container-hidden">
                <ul>
                    <li>
                        <div class="calculator-operation-header" id="addition-instruction-header" onClick={(e) => this.toggleDescriptionShown(e)}>Addition(+)<div>{this.state.shownObject[this.state.additionDescShown]}</div></div>
                        <p id="addition-instruction-description" class={this.state.additionDescShown}>'A+B' would add matrix A and matrix B.</p>
                    </li>
                    <li>
                        <div class="calculator-operation-header" id="subtraction-instruction-header" onClick={(e) => this.toggleDescriptionShown(e)}>Subtraction(-)<div>{this.state.shownObject[this.state.subtractionDescShown]}</div></div>
                        <p id="subtraction-instruction-description" class={this.state.subtractionDescShown}>'A-B' would subtract matrix A and matrix B.</p>
                    </li>
                    <li>
                        <div class="calculator-operation-header" id="multiplication-instruction-header" onClick={(e) => this.toggleDescriptionShown(e)}>Multiplication(*)<div>{this.state.shownObject[this.state.multiplicationDescShown]}</div></div>
                        <p id="multiplication-instruction-description" class={this.state.multiplicationDescShown}>'A*B' would multiply matrix A by matrix B.</p>
                    </li>
                    <li>
                        <div class="calculator-operation-header" id="transpose-instruction-header" onClick={(e) => this.toggleDescriptionShown(e)}>Transpose(t)<div>{this.state.shownObject[this.state.transposeDescShown]}</div></div>
                        <p id="transpose-instruction-description" class={this.state.transposeDescShown}>'At' would transpose matrix A.<br />
                            - Transpose is where all row values are flipped to their respective column, and each column
                            is flipped to be its respective row.<br />
                            - If you have an <i>nxn</i> matrix, all the values will be flipped across the eigenvalues
                            (right-down diagonal).
                        </p>
                    </li>
                    <li>
                        <div class="calculator-operation-header" id="trace-instruction-header" onClick={(e) => this.toggleDescriptionShown(e)}>Trace(e)<div>{this.state.shownObject[this.state.traceDescShown]}</div></div>
                        <p id="trace-instruction-description" class={this.state.traceDescShown}>'Ae' would give the trace of matrix A.<br />- Trace is the sum of all the values in the
                            diagonal of the matrix
                            thus the matrix must be size <i>nxn</i>.<br />- The values in the diagonal are also known as
                            <i>eigenvalues</i>, hence the
                            use of the letter 'e' for the forumula submission.</p>
                    </li>
                    <li>
                        <div class="calculator-operation-header" id="rowoperations-instruction-header" onClick={(e) => this.toggleDescriptionShown(e)}>Row Operations (R)<div>{this.state.shownObject[this.state.rowOperationsDescShown]}</div></div>
                        <p id="rowOperations-instruction-description" class={this.state.rowOperationsDescShown}>'AR' will bring up an input for Gaussian or Gauss-Jordan row operations.<br />
                            - Row operations should be typed in the following forms where R1 is
                            used for 'Row 1' for example<br />
                            <ul>
                                <li>- <u>Add Rows:</u> 'R1=R1+R2' will return matrix with row 2 added to row 1, and this
                                    is the new row 1. </li>
                                <li>- <u>Subtract Rows:</u> 'R2=R2-R1' will return matrix with row 1 subtracted from row
                                    2 and this is the new row 2. </li>
                                <li>- <u>Multiply Row By Integer:</u> 'R2=R2*2' will return matrix with Row 2 values
                                    multiplied by 2. </li>
                                <li>- <u>Divide Row By Integer:</u> 'R2=R2/2' will return matrix with Row 2 values
                                    divided by 2. </li>
                                <li>- <u>Add Multiple of A Row</u> 'R2=R2+R1*2' will return matrix with values in Row 2
                                    having the values in Row 1 multiplied by 2 then added to Row 2. </li>
                                <li>- <u>Switch Rows: </u> 'R2=R2>R1' will switch rows 1 and 2.</li>
                            </ul>
                        </p>
                    </li>
                    <li>
                        <div class="calculator-operation-header" id="cofactor-instruction-header" onClick={(e) => this.toggleDescriptionShown(e)}>Cofactor Calculations (C)<div>{this.state.shownObject[this.state.cofactorDescShown]}</div></div>
                        <p id="cofactor-instruction-description" class={this.state.cofactorDescShown}>- 'AC' will bring up an input for minor and cofactor calculations. Can only perform this
                            on size n=3 and n=4 matrices.<br />
                            <br />
                            <ul>
                                <li>- <u>Get Minor</u> 'M11' will return the calculation
                                    of the minor where row 1 and column 1 removed. </li>
                                <li>- <u>Get Cofactor</u> 'C11' will return the calculation
                                    of the cofactor where row 1 and column 1 removed. </li>
                                <li>- <u>Get Determinants</u> 'd' while in this calculator, get
                                    the determinant by typing in d. For n=2 matrices the formula
                                    for the determinant is </li>
                            </ul>
                        </p>
                    </li>
                </ul>
            </div>
        )
    }
}

export default OperationDescriptions;