import React, { useState } from "react";
import ProgressIndicator from "./ProgressIndicator";
import SaleForm from "./SaleForm";
import SalesList from "./SalesList";
import DashboardComponent from "./DashboardComponent";
import reactDom from "react-dom";

function App() {
    const [sales, setSales] = useState([]);
    const [showProgress, setShowProgress] = useState(false);
    
    const addSale = (sale) => {
        setShowProgress(true);
        setTimeout(() => {
        setSales([...sales, sale]);
        setShowProgress(false);
        }, 2000);
    };
    
    const deleteSale = (sale) => {
        setSales(sales.filter((item) => item !== sale));
    };
    
    return (
        <div className="container">
        <h1 className="text-center">Sales Dashboard</h1>
        <div className="row">
            <div className="col-md-6">
            <SaleForm onAddSale={addSale} />
            </div>
            <div className="col-md-6">
            <SalesList sales={sales} deleteSale={deleteSale} />
            </div>
        </div>
        <div className="row">
            <div className="col-md-12">
            <DashboardComponent sales={sales} />
            </div>
        </div>
        {showProgress && <ProgressIndicator />}
        </div>
    );
    }

export default App;