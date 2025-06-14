import React from 'react';

export default function OrderStatus({ currentStep = 0 }) {
    const steps = [
        { icon: 'fa-box', label: 'Ordered' },
        { icon: 'fa-motorcycle', label: 'Delivering' },
        { icon: 'fa-house', label: 'Delivered' },
    ];

    return (
        <div className="w-full max-w-3xl mx-auto flex flex-wrap justify-between items-center px-2 py-2 sm:px-4 relative">
        {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
            <div key={step.label} className="flex-1 flex flex-col items-center relative min-w-[80px]">
                <div
                className={`
                    flex items-center justify-center rounded-full border-2
                    transition-all duration-500
                    text-lg sm:text-2xl
                    w-10 h-10 sm:w-14 sm:h-14
                    ${isActive
                    ? 'bg-blue-500 text-white border-blue-500 animate-pulse'
                    : isCompleted
                    ? 'bg-green-500 text-white border-green-500'
                    : 'bg-gray-200 text-gray-400 border-gray-300'}
                `}
                >
                <i className={`fa-solid ${step.icon}`} />
                </div>
                <span className="mt-2 text-xs sm:text-sm text-center text-gray-700">
                {step.label}
                </span>
            </div>
            );
        })}
        </div>
    );
}