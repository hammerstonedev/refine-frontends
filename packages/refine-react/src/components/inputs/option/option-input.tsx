import React from 'react';
import { FlavorItem, Label, useInput } from 'components';
import { arrayToValue, valueToArray } from 'utils';

export const OptionInput = () => {
  const { display, options, multiple = false, value, onChange } = useInput<string | string[]>();

  if (!options) {
    throw new Error(`No options provided to OptionInput.`);
  }

  console.log('value:', value);

  return (
    <div>
      <Label screenReaderOnly>{display}</Label>
      <FlavorItem<'select.wrapper'> name="select.wrapper">
        <FlavorItem<'select'>
          name="select"
          value={multiple ? valueToArray(value) : value}
          onChange={(value) => {
            if (multiple) {
              return onChange({ value: valueToArray(value) });
            }

            return onChange({ value: arrayToValue(value) });
          }}
          multiple={multiple}
        >
          <FlavorItem<'select.button'> name="select.button">
            {valueToArray(value)
              .map((value) => options.find((option) => option.id === value)?.display)
              .filter(Boolean)
              .join(', ')}
          </FlavorItem>
          <FlavorItem<'select.listbox'> name="select.listbox">
            {options.map((option) => (
              <FlavorItem<'select.listbox.item'>
                key={option.id}
                name="select.listbox.item"
                value={option.id}
              >
                {option.display}
              </FlavorItem>
            ))}
          </FlavorItem>
        </FlavorItem>
      </FlavorItem>
    </div>
  );
};
