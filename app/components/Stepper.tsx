interface StepperProps {
  steps: {
    id: number;
    title: string;
    description: string;
  }[];
  currentStep: number;
}

export const Stepper = ({ steps, currentStep } : StepperProps) => (
  <div className="bg-white rounded-lg shadow p-6 mb-6">
    <h2 className="text-xl font-bold text-gray-900 mb-4">Setup Process</h2>
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= step.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {currentStep > step.id ? "✓" : step.id}
            </div>
            <div className="mt-2 text-center">
              <p className="text-sm font-medium text-gray-900">{step.title}</p>
              <p className="text-xs text-gray-500">{step.description}</p>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-0.5 mx-4 ${
                currentStep > step.id ? "bg-blue-600" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  </div>
);
