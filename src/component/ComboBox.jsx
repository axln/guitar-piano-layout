import React from 'react';

export const ComboBox = React.memo(({ values, onChange = null }) => {
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
