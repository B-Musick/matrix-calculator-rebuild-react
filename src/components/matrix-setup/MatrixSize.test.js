let React = require('react');
// Shallow acts like react-dom to render the component but wont render any underlying components
import { shallow } from 'enzyme';

import MatrixSize from './MatrixSize';

describe('<MatrixCount />', () => {
    const setInitialState = jest.fn(); // Function called to setInitialState
    const props = {
        inputsShown: 'matrix-size',
        ALPHABET: 'abcdefghijklmnopqrstuvwxyz',
        matrixCount: 2,
        setInitialState: setInitialState
    };
    const wrapper = shallow(<MatrixSize {...props} />);

    it('should render the input question "How big will the matrices be?"', () => {
        const paragraph = wrapper.find('p');
        const paragraphText = paragraph.text();
        expect(paragraphText).toBe('How big will the matrices be?');
    });
    it('Should render two sets of inputs since there are two matrices.', () => {

    })

});