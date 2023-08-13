
interface InputProps {
    type: string;
    placeholder?: string;
    label?: string;
    value?: string | number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }

export default InputProps;