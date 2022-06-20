import React from 'react';
import { Label, FlavorItem, useInput } from 'components';

export const DateInput = () => {
  const { display, value, onChange } = useInput<string>();

  return (
    <div>
      <Label screenReaderOnly>{display}</Label>
      <FlavorItem<'inputs.date'>
        name="inputs.date"
        value={value}
        onChange={(event) => onChange({ value: event.target.value })}
      />
    </div>
  );
};
