
import React, { useState } from 'react';

const SalesInfo = ({ sale, onEditSale }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [products, setProducts] = useState(sale.products); 

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const handleQuantityChange = (productId, newQuantity) => {
        const newProducts = products.map(product => {
            if (product.id === productId) {
                return {
                    ...product,
                    quantity: newQuantity
                };
            }
            return product;
        }
        );      
    };

    const handleValueChange = (productId, newValue) => {
        const newProducts = products.map(product => {
            if (product.id === productId) {
                return {
                    ...product,
                    value: newValue
                };
            }
            return product;
        }
        );
       
    };

    const handleDiscountChange = (productId, newDiscount) => {
        const newProducts = products.map(product => {
            if (product.id === productId) {
                return {
                    ...product,
                    discount: newDiscount
                };
            }
            return product;
        }
        );
        
    };

   

    return (
        <div className="sale-info">
            <div className="sale-info-header" onClick={handleToggleExpand}>
                <div className="sale-info-header-title">
                    <h3>{sale.customer}</h3>
                    <span>{sale.date}</span>
                </div>
                <div className="sale-info-header-price">
                    <h3>{sale.total}</h3>
                </div>
            </div>
            {isExpanded && (
                <div className="sale-info-content">
                    <div className="sale-info-products">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Produto</th>
                                    <th>Quantidade</th>
                                    <th>Valor Unitário</th>
                                    <th>Desconto</th>
                                    <th>Valor Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={product.quantity}
                                                onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={product.value}
                                                onChange={(e) => handleValueChange(product.id, e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={product.discount}
                                                onChange={(e) => handleDiscountChange(product.id, e.target.value)}
                                            />
                                        </td>
                                        <td>{product.total}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="sale-info-footer">
                        <button className="btn btn-primary" onClick={() => onEditSale(sale)}>Editar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SalesInfo;
