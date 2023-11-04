import React, { useState } from 'react';
import ProductList from './ProductList';

function ParentComponent() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    
    const handleSelectProduct = (productId) => {
        setSelectedProduct(productId);
       
    };

  

    return (
        <div>
            <h1>Parent Component</h1>
            
            <ProductList products={products} selectedProduct={selectedProduct} onSelectProduct={handleSelectProduct} />
            
        </div>
    );
}

export default ParentComponent;
