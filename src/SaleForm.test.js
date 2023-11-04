
import { render, screen, fireEvent } from '@testing-library/react';
import SaleForm from './SaleForm';

test('renders SaleForm without crashing', () => {
    render(<SaleForm onAddSale={() => {}} />);
});

test('allows for product addition', () => {
    render(<SaleForm onAddSale={() => {}} />);
    
    const productSelect = screen.getByRole('combobox');
    fireEvent.change(productSelect, { target: { value: 'Produto A' } });
    
    const quantityInput = screen.getByLabelText('Quantidade: ');
    fireEvent.change(quantityInput, { target: { value: '2' } });
    
    const unitPriceInput = screen.getByLabelText('Preço Unitário: ');
    fireEvent.change(unitPriceInput, { target: { value: '10' } });
    
    const addButton = screen.getByText('Adicionar Produto');
    fireEvent.click(addButton);
    
    const addedProduct = screen.getByText('Produto A - Quantidade: 2 - Total: R$ 20.00');
    expect(addedProduct).toBeInTheDocument();
});


