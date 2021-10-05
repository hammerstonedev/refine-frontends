import { BaseInputProps } from ".";

export interface NumberInputProps extends BaseInputProps {}

export const NumberInput = ({ display }: NumberInputProps) => {
  return (
    <div>
      <label className="sr-only">{display}</label>
      <input
        type="number"
        className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );
};
