import React from 'react';
import { FlavorItem, Label, useInput } from 'components';
import { useClause } from 'components';
import { arrayToValue } from 'utils';

export const RelativeDateInput = () => {
  const {
    meta: { units = [], modifiers = [] },
  } = useClause();
  const { display, amount, unit, modifier, onChange } =
    useInput<{ amount: string; unit: string; modifier: string }>();

  return (
    <div>
      <Label screenReaderOnly>{display}</Label>
      <FlavorItem<'inputs.date.relative.wrapper'> name="inputs.date.relative.wrapper">
        <FlavorItem<'inputs.date.relative'>
          name="inputs.date.relative"
          value={amount}
          onChange={(event) => onChange({ amount: event.target.value })}
        />
        <FlavorItem<'select.wrapper'> name="select.wrapper">
          <FlavorItem<'select'>
            name="select"
            value={unit}
            onChange={(value) => onChange({ unit: arrayToValue(value) })}
          >
            <FlavorItem<'select.button'> name="select.button">
              {units.find(({ id }) => unit === id)}
            </FlavorItem>
            <FlavorItem<'select.listbox'> name="select.listbox">
              {units.map((unit) => (
                <FlavorItem<'select.listbox.item'>
                  key={unit.id}
                  name="select.listbox.item"
                  value={unit.id}
                >
                  {unit.display}
                </FlavorItem>
              ))}
            </FlavorItem>
          </FlavorItem>
        </FlavorItem>
        <FlavorItem<'select.wrapper'> name="select.wrapper">
          <FlavorItem<'select'>
            name="select"
            value={modifier}
            onChange={(value) => onChange({ modifier: arrayToValue(value) })}
          >
            <FlavorItem<'select.button'> name="select.button">
              {modifiers.find(({ id }) => modifier === id)}
            </FlavorItem>
            <FlavorItem<'select.listbox'> name="select.listbox">
              {modifiers.map((modifier) => (
                <FlavorItem<'select.listbox.item'>
                  key={modifier.id}
                  name="select.listbox.item"
                  value={modifier.id}
                >
                  {modifier.display}
                </FlavorItem>
              ))}
            </FlavorItem>
          </FlavorItem>
        </FlavorItem>
      </FlavorItem>
    </div>
  );
};
