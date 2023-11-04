import React, { useState } from "react";

const generateUniqueId = () => Date.now().toString();

function SaleForm({
  onAddSale,
  onUpdateSale,
  editMode = false,
  saleToEdit = null,
}) {

  function updateProductSubtotal(products) {
  
    const subtotal = products.reduce(
      (acc, product) => acc + product.quantity * product.price,
      0
    );
    return subtotal;
  }

 
  function updateTotalDiscount(products) {
 
    const totalDiscount = products.reduce(
      (acc, product) => acc + (product.discount || 0),
      0
    );
    return totalDiscount;
  }


  function updateTotalSale(subtotal, totalDiscount) {
 
    const totalSale = subtotal - totalDiscount;
    return totalSale;
  }

  function updateTotalItems(products) {

    const totalItems = products.reduce(
      (acc, product) => acc + product.quantity,
      0
    );
    return totalItems;
  }


  function calculateSubtotals(products) {
    const subtotal = updateProductSubtotal(products);
    const totalDiscount = updateTotalDiscount(products);
    const totalSale = updateTotalSale(subtotal, totalDiscount);
    const totalItems = updateTotalItems(products);

   
    setSale((prevSale) => ({
      ...prevSale,
      subtotals: {
        totalItems,
        subtotal,
        totalDiscount,
        totalSale,
      },
    }));
  }

  
  function handleAddProduct(product) {
    
    calculateSubtotals(sale.products);
  }


  function handleRemoveProduct(productId) {
 
    calculateSubtotals(sale.products);
  }


  function handleUpdateProduct(productId, newQuantity, newDiscount) {
    
    calculateSubtotals(sale.products);
  }

  const [sale, setSale] = useState(
    editMode && saleToEdit
      ? saleToEdit
      : {
          id: generateUniqueId(),
          date: new Date().toISOString(),
          status: "Aberta",
          client: "",
          products: [],
          subtotals: {
            totalItems: 0,
            subtotal: 0,
            totalDiscount: 0,
            totalSale: 0,
          },
        }
  );

 

    function handleStatusChange(event) {
        const newStatus = event.target.value;
        setSale(prevSale => ({ ...prevSale, status: newStatus }));
    }


    function handleClientChange(event) {
        const newClient = event.target.value;
        setSale(prevSale => ({ ...prevSale, client: newClient }));
    }



    function handleAddProductClick() {
        setSale(prevSale => ({
            ...prevSale,
            products: [
                ...prevSale.products,
                {
                    id: generateUniqueId(),
                    name: '',
                    price: 0,
                    quantity: 0,
                    discount: 0
                }
            ]
        }));
    }

    // Função para remover um produto da venda

    function handleRemoveProductClick(productId) {
        setSale(prevSale => ({
            ...prevSale,
            products: prevSale.products.filter(product => product.id !== productId)
        }));
    }


    function handleProductChange(productId, newProduct) {
        setSale(prevSale => ({
            ...prevSale,
            products: prevSale.products.map(product => product.id === productId ? newProduct : product)
        }));
    }

    // Função para salvar a venda

    function handleSaveClick() {
        if (editMode) {
            onUpdateSale(sale);
        } else {
            onAddSale(sale);
        }
    }

    return (
        <div className="container mt-3">
            <h2 className="text-center mb-4">{editMode ? 'Editar' : 'Nova'} venda</h2>
            <div className="row">
                <div className="col-md-12 mb-3">
                    <div className="card">
                        <div className="card-header">Dados da venda</div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="status">Status</label>
                                    <select id="status" className="form-control" value={sale.status} onChange={handleStatusChange}>
                                        <option value="Aberta">Aberta</option>
                                        <option value="Concluída">Concluída</option>
                                        <option value="Cancelada">Cancelada</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="client">Cliente</label>
                                    <input type="text" id="client" className="form-control" value={sale.client} onChange={handleClientChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 mb-3">
                    <div className="card">
                        <div className="card-header">Produtos</div>
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Preço</th>
                                        <th>Quantidade</th>
                                        <th>Desconto</th>
                                        <th>Subtotal</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sale.products.map(product => (
                                        <tr key={product.id}>
                                            <td>
                                                <input type="text" className="form-control" value={product.name} onChange={event => handleProductChange(product.id, { ...product, name: event.target.value })} />
                                            </td>
                                            <td>
                                                <input type="number" className="form-control" value={product.price} onChange={event => handleProductChange(product.id, { ...product, price: Number(event.target.value) })} />
                                            </td>
                                            <td>
                                                <input type="number" className="form-control" value={product.quantity} onChange={event => handleProductChange(product.id, { ...product, quantity: Number(event.target.value) })} />
                                            </td>
                                            <td>
                                                <input type="number" className="form-control" value={product.discount} onChange={event => handleProductChange(product.id, { ...product, discount: Number(event.target.value) })} />
                                            </td>
                                            <td>
                                                {(product.quantity * product.price * (1 - product.discount / 100)).toFixed(2)}
                                            </td>
                                            <td>
                                                <button className="btn btn-danger" onClick={() => handleRemoveProductClick(product.id)}>Remover</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="4" className="text-right">Subtotal</td>
                                        <td>{sale.subtotals.subtotal.toFixed(2)}</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4" className="text-right">Total de desconto</td>
                                        <td>{sale.subtotals.totalDiscount.toFixed(2)}</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4" className="text-right">Valor total</td>
                                        <td>{sale.subtotals.totalSale.toFixed(2)}</td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </table>
                            <button className="btn btn-primary" onClick={handleAddProductClick}>Adicionar produto</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <button className="btn btn-primary" onClick={handleSaveClick}>Salvar</button>
            </div>
        </div>
    );
}

export default SaleForm;