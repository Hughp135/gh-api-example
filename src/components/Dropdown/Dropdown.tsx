import React from 'react';
import Select from 'react-select';

export interface SortOption {
  value: string;
  label: string;
}

interface DropdownProps {
  onChange: (value: string) => void;
}

export const options: SortOption[] = [
  { value: 'best-match', label: 'Best match' },
  { value: 'stars', label: 'Stars' },
  { value: 'forks', label: 'Forks' },
  { value: 'help-wanted-issues', label: 'Help Wanted Issues' },
  { value: 'updated', label: 'Updated' },
];

export const Dropdown: React.FC<DropdownProps> = (props) => {
  const { onChange } = props;

  return (
    <Select
      options={options}
      defaultValue={options[0]}
      onChange={(option) => onChange(option?.value || '')}
    />
  );
};
