import React from 'react';
import SearchBar from './search';

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <SearchBar
      {...props}
      label="pagination search"
      value={value}
      onChange={(e: {
        target: {
          value: React.SetStateAction<
            string | number | (string & readonly string[]) | (number & readonly string[])
          >;
        };
      }) => setValue(e.target.value)}
    />
  );
}

export default DebouncedInput;
