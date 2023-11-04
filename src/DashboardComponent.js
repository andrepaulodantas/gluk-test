
import React from 'react';

const DashboardComponent = ({ sales }) => {
 
    const totalSales = Array.isArray(sales) ? sales.length : 0;


    const ticketAverage = (Array.isArray(sales) ? sales.reduce((acc, sale) => acc + sale.total, 0) : 0) / (totalSales || 1);


    let productQuantities = {};
    Array.isArray(sales) && sales.forEach(sale => {
        sale.products.forEach(product => {
            if (!productQuantities[product.id]) {
                productQuantities[product.id] = 0;
            }
            productQuantities[product.id] += product.quantity;
        });
    });

    const mostSoldProduct = Object.keys(productQuantities).reduce((a, b) => productQuantities[a] > productQuantities[b] ? a : b, null);


    const mostSoldProductDetails = mostSoldProduct ? Array.isArray(sales) ? sales.flatMap(sale => sale.products).find(p => p.id === mostSoldProduct) : null : null;
    
    return (
        <div className="container mt-3">
            <h2 className="text-center mb-4">Dashboard</h2>
            <div className="row">
                <div className="col-md-4 mb-3">
                    <div className="card">
                        <div className="card-header">Total de vendas</div>
                        <div className="card-body">
                            <p className="card-text">{totalSales}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card">
                        <div className="card-header">Ticket médio</div>
                        <div className="card-body">
                            <p className="card-text">{ticketAverage.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card">
                        <div className="card-header">Produto mais vendido</div>
                        <div className="card-body">
                            <p className="card-text">{mostSoldProductDetails ? `${mostSoldProductDetails.name} - ${productQuantities[mostSoldProduct]} unidades` : '-'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardComponent;