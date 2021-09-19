import React from 'react';

type ComboBoxProps = {
  values: Record<string, string>;
  onChange: (value: string) => void;
};

export const ComboBox: React.FC<ComboBoxProps> = React.memo(({ values, onChange = null }) => {
  return (
    <select
      onChange={(e) => {
        onChange && onChange(e.target.value);
      }}>
      {Object.keys(values).map((key) => (
        <option key={key} value={values[key]}>
          {key}
        </option>
      ))}
    </select>
  );
});
