"use client";

import * as Select from "@radix-ui/react-select";
import * as Label from "@radix-ui/react-label";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  id: string;
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  options: SelectOption[];
  required?: boolean;
  error?: string;
}

export default function CustomSelect({
  label,
  id,
  placeholder = "Select an option...",
  value,
  onValueChange,
  options,
  required,
  error,
}: SelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label.Root htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label.Root>

      <Select.Root value={value} onValueChange={onValueChange}>
        <Select.Trigger
          id={id}
          className={`inline-flex items-center justify-between px-3 py-2 text-sm bg-white border rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors data-[placeholder]:text-gray-400 ${
            error
              ? "border-red-300 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300"
          }`}
        >
          <Select.Value placeholder={placeholder} />
          <Select.Icon asChild>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            className="overflow-hidden bg-white w-full  rounded-md shadow-lg border border-gray-200 z-50"
            position="popper"
            sideOffset={5}
          >
            <Select.Viewport className="p-1">
              {options.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  className="relative flex items-center px-3 py-2 text-sm text-gray-900 rounded cursor-pointer select-none hover:bg-blue-50 hover:text-blue-900 focus:bg-blue-50 focus:text-blue-900 focus:outline-none data-[disabled]:text-gray-400 data-[disabled]:pointer-events-none"
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                  <Select.ItemIndicator asChild>
                    <svg
                      className="absolute right-2 w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
