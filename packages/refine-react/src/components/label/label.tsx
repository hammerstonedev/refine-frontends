import React from 'react';

export type LabelProps = {
  screenReaderOnly?: boolean;
} & React.HTMLAttributes<HTMLLabelElement>;

/**
 * From Tailwind CSS.
 */
const srOnly = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: 0,
} as const;

export const Label = ({ screenReaderOnly = false, children, style, ...props }: LabelProps) => {
  return (
    <label {...props} style={{ ...style, ...(screenReaderOnly ? srOnly : {}) }}>
      {children}
    </label>
  );
};
