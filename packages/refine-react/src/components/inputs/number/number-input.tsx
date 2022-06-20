import React from 'react';
import { FlavorItem, Label, useInput } from 'components';

export const NumberInput = () => {
  const { display, value, onChange } = useInput<string>();

  return (
    <div>
      <Label screenReaderOnly>{display}</Label>
      <FlavorItem<'inputs.number'>
        name="inputs.number"
        value={value}
        onChange={(event) => onChange({ value: event.target.value })}
      />
    </div>
  );
};
