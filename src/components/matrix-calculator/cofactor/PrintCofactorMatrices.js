let React = require('react');

class PrintCofactors extends React.Component {
    state = {
        minors: this.props.minors,
        cofactors: this.props.cofactors
    }
    componentWillReceiveProps = (nextProps) => {
        this.setState({ minors: nextProps.minors, cofactors: nextProps.cofactors })
    }

    printMinors = () => {
        let keys = Object.keys(this.props.minors);
        let minorPrintouts = [];
        keys.forEach(key => {
            minorPrintouts.push(<div key={key} className="minor-holder">{`'${key}' : ${this.state.minors[key]}`}</div>)
        });
        return minorPrintouts;
    }
    printCofactors = () => {
        let keys = Object.keys(this.props.cofactors);
        let cofactorsPrintouts = [];
        keys.forEach(key => {
            cofactorsPrintouts.push(<div key={key} className="cofactors-holder">{`'${key}' : ${this.state.cofactors[key]}`}</div>)
        });
        return cofactorsPrintouts;
    }
    render() {
        return (
            <div id="cofactor-grid">
                <div id="minor-column">
                    {this.printMinors()}
                </div>
                <div id="cofactor-column">
                    {this.printCofactors()}
                </div>
            </div>
        )
    }
}

export default PrintCofactors;