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
    setValues({ ...values, [name]: value });
  };

  const handleChangeWithVal = ({ name, value }: { name: keyof T; value: string }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const validResult = validator(values);
    if (!validResult.length) await onSubmit(values);
    else
      toast(validResult, {
        position: "bottom-center",
      });
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
