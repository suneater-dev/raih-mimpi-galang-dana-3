import React from 'react';
import './ProgressSteps.css';

const ProgressSteps = ({ steps = [] }) => {
  return (
    <div className="progress-section">
      <div className="progress-steps">
        {steps.map((step, index) => (
          <div key={step.number} className="step">
            <span className={`step-number ${step.active ? 'active' : 'inactive'}`}>
              {step.number}
            </span>
            <p className={`step-text ${step.active ? 'active' : 'inactive'}`}>
              {step.label}
            </p>
            {index < steps.length - 1 && <hr className="step-divider" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;