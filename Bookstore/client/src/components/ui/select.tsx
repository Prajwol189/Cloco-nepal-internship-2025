// components/ui/select.tsx

import React from "react";

interface SelectProps {
  children: React.ReactNode;
  value: string;
  onValueChange: (value: string) => void;
  multiple?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  children,
  value,
  onValueChange,
  multiple = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (multiple) {
      const selectedOptions = Array.from(e.target.selectedOptions).map(
        (option) => option.value
      );
      onValueChange(selectedOptions);
    } else {
      onValueChange(e.target.value);
    }
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      multiple={multiple}
      className="w-full p-2 border border-gray-300 rounded-md"
    >
      {children}
    </select>
  );
};

export const SelectTrigger: React.FC = ({ children }) => {
  return <>{children}</>;
};

export const SelectContent: React.FC = ({ children }) => {
  return <>{children}</>;
};

export const SelectItem: React.FC<{ value: string }> = ({
  value,
  children,
}) => {
  return <option value={value}>{children}</option>;
};

export const SelectValue: React.FC<{ placeholder: string }> = ({
  placeholder,
}) => {
  return <>{placeholder}</>;
};
