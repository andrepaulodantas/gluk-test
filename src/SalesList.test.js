
import { render, screen, fireEvent } from '@testing-library/react';
import SalesList from './SalesList';

const mockSales = [
    {
        id: 1,
        date: new Date().toISOString(),
        status: 'Registrada',
        client: 'Cliente A',
        products: [
            { name: 'Produto A', quantity: 2, unitPrice: 10, discount: 0 }
        ]
    },
    {
        id: 2,
        date: new Date().toISOString(),
        status: 'Registrada',
        client: 'Cliente B',
        products: [
            { name: 'Produto B', quantity: 1, unitPrice: 20, discount: 0 }
        ]
    }
];

test('renders SalesList without crashing', () => {
    render(<SalesList sales={mockSales} onEditSale={() => {}} onCancelSale={() => {}} onDeleteSale={() => {}} />);
});

test('displays sales and allows for client search', () => {
    render(<SalesList sales={mockSales} onEditSale={() => {}} onCancelSale={() => {}} onDeleteSale={() => {}} />);
    
    const clientAElement = screen.getByText('Cliente A');
    expect(clientAElement).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText('Buscar por cliente...');
    fireEvent.change(searchInput, { target: { value: 'Cliente B' } });

    const clientBElement = screen.getByText('Cliente B');
    expect(clientBElement).toBeInTheDocument();
});


