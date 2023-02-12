import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MyButton from '../components/FormElements/MyButton';

test('should render custom MyButton component', () => {
    const name = 'test my buttom';
    const disabled = true;
    render(<MyButton name={name} disabled={disabled}/>);
    
    const MyButtonElement1 = screen.getByTestId('my-pink-button');
    expect(MyButtonElement1).toBeInTheDocument();
    expect(MyButtonElement1).toHaveTextContent(name);
    expect(MyButtonElement1).toBeDisabled();
});