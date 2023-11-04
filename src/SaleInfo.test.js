
import { render, screen } from '@testing-library/react';
import SaleInfo from './SaleInfo';

const mockSale = {
    id: 1,
    date: new Date().toISOString(),
    status: 'Registrada',
    client: 'Cliente A',
    products: [
        { name: 'Produto A', quantity: 2, unitPrice: 10, discount: 0 }
    ]
};

test('renders SaleInfo without crashing', () => {
    render(<SaleInfo sale={mockSale} />);
});

test('displays sale details', () => {
    render(<SaleInfo sale={mockSale} />);
    
    const clientElement = screen.getByText('Cliente A');
    expect(clientElement).toBeInTheDocument();

    const productElement = screen.getByText('Produto A');
    expect(productElement).toBeInTheDocument();
});


