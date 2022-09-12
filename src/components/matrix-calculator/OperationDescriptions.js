let React = require('react');

class OperationDescriptions extends React.Component {
    state = { matrixHolder: this.props.matrixHolder, matrixCount: this.props.matrixCount }

    render() {
        return (
            <div id="matrix-calculator-operations" class="inputs-container-hidden">
                <ul>
                    <li>
                        <div class="calculator-operation-header"><b>Addition(+):</b></div>
                        <p>- 'A+B' would add matrix A and matrix B.</p>
                    </li>
                    <li>
                        <div class="calculator-operation-header"><b>Subtraction(-):</b></div>
                        <p>- 'A-B' would subtract matrix A and matrix B.</p>
                    </li>
                    <li>
                        <div class="calculator-operation-header">Multiplication(*):</div>
                        <p>- 'A*B' would multiply matrix A by matrix B.</p>
                    </li>
                    <li>
                        <div class="calculator-operation-header">Transpose(<span>t</span>): </div>
                        <p>- 'At' would transpose matrix A.<br />
                            - Transpose is where all row values are flipped to their respective column, and each column
                            is flipped to be its respective row.<br />
                            - If you have an <i>nxn</i> matrix, all the values will be flipped across the eigenvalues
                            (right-down diagonal).
                        </p>
                    </li>
                    <li>
                        <div class="calculator-operation-header">Trace(<span>e</span>): </div>
                        <p>- 'Ae' would give the trace of matrix A.<br />- Trace is the sum of all the values in the
                            diagonal of the matrix
                            thus the matrix must be size <i>nxn</i>.<br />- The values in the diagonal are also known as
                            <i>eigenvalues</i>, hence the
                            use of the letter 'e' for the forumula submission.</p>
                    </li>
                    <li>
                        <div class="calculator-operation-header">Row Operations (R): </div>
                        <p>- 'AR' will bring up an input for Gaussian or Gauss-Jordan row operations.<br />
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
                        <div class="calculator-operation-header">Cofactor Calculations (C) </div>
                        <p>- 'AC' will bring up an input for minor and cofactor calculations. Can only perform this
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