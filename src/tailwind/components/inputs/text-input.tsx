import { BaseInputProps } from ".";

export interface TextInputProps extends BaseInputProps {}

export const TextInput = ({ display }: TextInputProps) => {
  return (
    <div>
      <label className="sr-only">{display}</label>
      <input
        type="text"
        className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );
};
