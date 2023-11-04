
import React from 'react';
import SalesInfo from './SalesInfo';

const SalesList = ({ sales, onEditSale, onCancelSale }) => {

    const handleCancelSale = (saleId) => {
    
        onCancelSale(saleId);
       
        console.log('Stock update event for cancelling sale:', saleId);
    };

    const handleEditSale = (saleId) => {
        
        onEditSale(saleId);
    };

    return (
        <div>
            {sales.map((sale, index) => (
                <div key={sale.id || `sale-${index}`} className="card mb-3">
                    <div className="card-body">
                        <SalesInfo sale={sale} />
                        <button className="btn btn-primary me-2" onClick={() => handleEditSale(sale.id)}>Edit</button>
                        <button className="btn btn-danger" onClick={() => handleCancelSale(sale.id)}>Cancel</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SalesList;
