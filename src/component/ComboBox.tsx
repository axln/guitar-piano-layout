import React from 'react';

type ComboBoxProps = {
  values: Record<string, string>;
  onChange?: (value: string) => void;
  value?: string;
  disabled?: boolean;
};

export const ComboBox: React.FC<ComboBoxProps> = React.memo(
  ({ values, value, disabled = false, onChange = null }) => {
    return (
      <select
        disabled={disabled}
        onChange={(e) => {
          onChange && onChange(e.target.value);
        }}>
        {Object.keys(values).map((key) => (
          <option key={key} value={values[key]} selected={values[key] === value}>
            {key}
          </option>
        ))}
      </select>
    );
  }
);
