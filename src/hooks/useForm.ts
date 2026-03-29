import { useState } from "react";
import { toast } from "sonner";

interface useFormProps<T> {
  initialVal: T;
  onSubmit: (datas: T) => Promise<void>;
  validator: (datas: T) => string;
}

export default function useForm<T>({ initialVal, onSubmit, validator }: useFormProps<T>) {
  const [values, setValues] = useState<T>(initialVal);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    const type = (event.target as HTMLInputElement).type;
    setValues({ ...values, [name]: type === "number" ? Number(value) : value });
  };

  const handleChangeWithVal = ({ name, value }: { name: keyof T; value: string | boolean }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const validResult = validator(values);
    if (!validResult.length) await onSubmit(values);
    else toast.warning(validResult);
    setIsLoading(false);
  };

  return {
    values,
    isLoading,
    handleChange,
    handleChangeWithVal,
    handleSubmit,
  };
}
