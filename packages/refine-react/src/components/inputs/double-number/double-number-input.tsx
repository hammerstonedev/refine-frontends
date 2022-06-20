import React from 'react';
import { FlavorItem, Label, useInput } from 'components';

export const DoubleNumberInput = () => {
  const { display, value1, value2, onChange } = useInput<{ value1: string; value2: string }>();

  return (
    <div>
      <Label screenReaderOnly>{display}</Label>
      <FlavorItem<'inputs.number.double.wrapper'> name="inputs.number.double.wrapper">
        <FlavorItem<'inputs.number.double'>
          name="inputs.number.double"
          value={value1}
          onChange={(event) => onChange({ value1: event.target.value })}
        />
        <FlavorItem<'inputs.number.double.joiner'> name="inputs.number.double.joiner">
          and
        </FlavorItem>
        <FlavorItem<'inputs.number.double'>
          name="inputs.number.double"
          value={value2}
          onChange={(event) => onChange({ value2: event.target.value })}
        />
      </FlavorItem>
    </div>
  );
};
