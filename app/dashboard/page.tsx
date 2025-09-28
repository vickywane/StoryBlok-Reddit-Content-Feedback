"use client";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useConfigStore } from "../store/configStore";
import { Stepper } from "../components/Stepper";
import Stories from "../components/Stories";
import Feedback from "../components/Feedback/Index";
import { STEPS } from "../lib/conts";
import APICredentials from "../components/APICredentials";

export default function Page() {
  const { currentStep } = useConfigStore();

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <Stepper steps={STEPS} currentStep={currentStep} />

            {currentStep === 1 && <APICredentials />}

            {currentStep === 2 && <Stories />}
            
            {currentStep === 3 && <Feedback />}
          </div>
        </main>
      </div>
    </div>
  );
}
