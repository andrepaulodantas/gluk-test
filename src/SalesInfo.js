
import React, { useState } from 'react';

function SaleForm({ onAddSale, clients, products }) {

  const [saleDate, setSaleDate] = useState(new Date().toISOString().slice(0, 16));
  const [status, setStatus] = useState('Aberta');
  const [selectedClient, setSelectedClient] = useState('');
  const [filteredClients, setFilteredClients] = useState(clients || []);
  const [saleProducts, setSaleProducts] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});

  const handleClientChange = (e) => {
    setSelectedClient(e.target.value);
    if (clients) {
        setFilteredClients(clients.filter((client) => client.name.toLowerCase().includes(e.target.value.toLowerCase())));
    } else {
      
        setFilteredClients([]);
    }
}

  const handleProductChange = (e) => {
    if (products) {
        const product = products.find((product) => product.name === e.target.value);
        setSaleProducts([...saleProducts, product]);
    } else {
      
    }
}

  const handleRemoveProduct = (product) => {
    setSaleProducts(saleProducts.filter((p) => p.name !== product.name));
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (typeof onAddSale === "function") {
    onAddSale({ date: saleDate, status, client: selectedClient, products: saleProducts });
    }
    setSaleDate(new Date().toISOString().slice(0, 16));
    setStatus('Aberta');
    setSelectedClient('');
    setSaleProducts([]);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="form-row">
        <label htmlFor="sale-date">Data e Hora</label>
        <input className="form-control" type="datetime-local" id="sale-date" value={saleDate} onChange={(e) => setSaleDate(e.target.value)} />
      </div>
      <div className="form-row">
        <label htmlFor="sale-status">Status</label>
        <select id="sale-status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Aberta">Aberta</option>
          <option value="Fechada">Fechada</option>
          <option value="Cancelada">Cancelada</option>
        </select>
      </div>
        <div className="form-row">
        <label htmlFor="client-name">Cliente</label>
        <input className="form-control" type="text" id="client-name" value={selectedClient} onChange={handleClientChange} />
        <ul className="client-list">
          {filteredClients.map((client) => (
            <li key={client.id} onClick={() => setSelectedClient(client.name)}>{client.name}</li>
          ))}
        </ul>
        </div>
        <div className="form-row">
        <label htmlFor="product-name">Produto</label>
        <select id="product-name" onChange={handleProductChange}>
          <option value="">Selecione um produto...</option>
          {products && products.map((product) => (
            <option key={product.id} value={product.name}>{product.name}</option>
          ))}
        </select>
        <ul className="product-list">
          {saleProducts && saleProducts.map((product) => (
            <li key={product.id} onClick={() => handleRemoveProduct(product)}>{product.name}</li>
          ))}
        </ul>
            <ul className="product-list">
                            {saleProducts.map((product) => (
                              <li key={product.id} onClick={() => handleRemoveProduct(product)}>{product.name}</li>
                            ))}
                          </ul>
                      </div>
                      <div className="form-row">
                          <button className="btn btn-primary" type="submit">Registrar Venda</button>
                      </div>
                  </form>
              );
          }
          

export default SaleForm;

