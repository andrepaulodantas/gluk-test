
import { render, screen, fireEvent } from '@testing-library/react';
import ProductList from './ProductList';

const mockProducts = [
    { id: 1, name: 'Produto A', price: 10 },
    { id: 2, name: 'Produto B', price: 20 }
];

test('renders ProductList without crashing', () => {
    render(<ProductList products={mockProducts} />);
});

test('allows for product selection', () => {
    render(<ProductList products={mockProducts} onSelectProduct={() => {}} />);
    
    const productSelect = screen.getByRole('combobox');
    fireEvent.change(productSelect, { target: { value: 'Produto A' } });
    
    const selectedOption = screen.getByText('Produto A - R$ 10.00');
    expect(selectedOption).toBeInTheDocument();
});


