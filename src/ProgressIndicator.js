
import React from 'react';

const ProgressIndicator = ({ currentStep }) => {
  
    const steps = ['Adicionar Produto', 'Registrar Produto', 'Editar Produto'];

    return (
        <div className="progress-indicator-container">
            <ul className="progress-indicator">
                {steps.map((step, index) => (
                    <li key={step} className={`step ${index === currentStep ? 'active' : ''}`}>
                        <span className="step-number">{index + 1}</span>
                        <span className="step-name">{step}</span>
                        {index < steps.length - 1 && <hr className="step-line" />}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProgressIndicator;

