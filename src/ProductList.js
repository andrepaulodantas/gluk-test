
import React from 'react';

function ProductList({ products, selectedProduct, onSelectProduct }) {

    const handleSelectProduct = (productId) => {
        onSelectProduct(productId);
    }

    return (
        <div className="list-group">
            {products.map(product => (
                <button key={product.id} type="button" className={`list-group-item list-group-item-action ${selectedProduct === product.id ? 'active' : ''}`} onClick={() => handleSelectProduct(product.id)}>
                    {product.name}
                </button>
            ))}
        </div>
    );

}   

export default ProductList;