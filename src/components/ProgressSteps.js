import React from 'react';
import './ProgressSteps.css';

const ProgressSteps = ({ currentStep = 1 }) => {
  const steps = [
    { number: 1, text: 'Tujuan' },
    { number: 2, text: 'Detail pasien' },
    { number: 3, text: 'Riwayat medis' },
    { number: 4, text: 'Target donasi' },
    { number: 5, text: 'Judul' },
    { number: 6, text: 'Cerita' },
    { number: 7, text: 'Ajakan' }
  ];

  const getStepStatus = (stepNumber) => {
    if (stepNumber < currentStep) return 'completed';
    if (stepNumber === currentStep) return 'active';
    return 'inactive';
  };

  const getStepDisplay = (stepNumber) => {
    if (stepNumber < currentStep) return '✓';
    return stepNumber.toString();
  };

  return (
    <div className="progress-section">
      <div className="progress-steps">
        {steps.map((step, index) => (
          <div key={step.number} className="step">
            <span className={`step-number ${getStepStatus(step.number)}`}>
              {getStepDisplay(step.number)}
            </span>
            <p className={`step-text ${getStepStatus(step.number)}`}>
              {step.text}
            </p>
            {index < steps.length - 1 && <hr className="step-divider" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;