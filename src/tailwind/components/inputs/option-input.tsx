import { BaseInputProps } from ".";
import { Option } from "../../../types";

export interface OptionInputProps extends BaseInputProps {
  options: Option[];
}

export const OptionInput = ({ display, options }: OptionInputProps) => {
  return (
    <div>
      <label className="sr-only">{display}</label>
      <select className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        {options.map((option) => (
          <option key={option.id}>{option.display}</option>
        ))}
      </select>
    </div>
  );
};
