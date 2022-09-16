import { shallow } from 'enzyme';
import MatrixCount from './MatrixCount';

let React = require('react');
// Shallow acts like react-dom to render the component but wont render any underlying components

describe('<MatrixCount />', () => {
    const mockCallBack = jest.fn(); // Function called to setInitialState
    const props = { inputsShown: 'matrix-count', setInitialState: mockCallBack };
    const wrapper = shallow(<MatrixCount {...props} />);

    it('should render the input question', () => {
        const paragraph = wrapper.find('p');
        const paragraphText = paragraph.text();
        expect(paragraphText).toBe('How many matrices?');
    });
    let matrixInput = wrapper.find('input#matrix-count'); // Get the matrix input element

    it('should render an input for matrix count', () => {
        expect(matrixInput);
    });

    it('should render a value from the input when onChange occurs (22)', () => {
        matrixInput.simulate('change', { target: { value: '22' } });
        wrapper.update();
        expect(wrapper.find('#matrix-count').props().value).toEqual('22')
    });

    /********************* SUBMIT BUTTON *****************************/
    const button = wrapper.find('input#matrix-count-button');
    it('should call the mockCallBack function representing setInitialState', () => {
        button.simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });
    it('should set the state of matrixCount to that which was input (22), which was obtained from onChange', () => {
        button.simulate('click');
        expect(wrapper.state('matrixCount')).toEqual('22');
    });
    it('should call the mockCallBack function representing setInitialState, passing two arguments (props.inputsShown and this.state.matrixCount).', () => {
        button.simulate('click');
        expect(mockCallBack).toHaveBeenCalledWith(props.inputsShown, parseInt(wrapper.state('matrixCount')));

    });

});