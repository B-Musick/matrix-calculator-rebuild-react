import PrintMatrices from './PrintMatrices';
import CalculatorInput from './CalculatorInput';
import OperationDescriptions from './OperationDescriptions';
let React = require('react');

class MatrixCalculator extends React.Component {
    // Matrix holder holds the different matrices, matrix count is the number of matrices
    state = { matrixHolder: this.props.matrixHolder, matrixCount: this.props.matrixCount }

    UNSAFE_componentWillReceiveProps(nextProps) {
        // Receives props from the App.js, and matrixHolder will update in CalculatorInput when new calculation occurs
        this.setState({ matrixHolder: nextProps.matrixHolder, matrixCount: nextProps.matrixCount })
    }
    
    updateMatrixHolder = (newMatrixHolder, newMatrixCount) => {
        // After user inputs operation, need to update the matrixHolder to print the new matrix
        // Values passed in from CalculatorInput component
        this.setState({
            matrixHolder: newMatrixHolder,
            matrixCount: parseInt(newMatrixCount)
        })
    }

    render() {
        return (
            <div id="matrix-calculator-container">
                <PrintMatrices matrixHolder={this.state.matrixHolder} inputsShown={this.state.inputsShown} matrixCount={this.state.matrixCount} ALPHABET={this.state.ALPHABET} />

                <CalculatorInput matrixHolder={this.state.matrixHolder} inputsShown={this.state.inputsShown} matrixCount={this.state.matrixCount} ALPHABET={this.state.ALPHABET} updateMatrixHolder={this.updateMatrixHolder} />

                <OperationDescriptions matrixHolder={this.state.matrixHolder} inputsShown={this.state.inputsShown} matrixCount={this.state.matrixCount} ALPHABET={this.state.ALPHABET} />
            </div>
        )
    }
}

export default MatrixCalculator;