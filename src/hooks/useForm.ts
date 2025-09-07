import { useState } from "react";

interface useFormProps<T> {
  initialVal: T;
  onSubmit: (datas: T) => Promise<void>;
  validator: (datas: T) => Record<keyof T, string>;
}

export default function useForm<T>({ initialVal, onSubmit, validator }: useFormProps<T>) {
  const [values, setValues] = useState<T>(initialVal);
  const [errors, setErrors] = useState<Record<keyof T, string>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const mdEditorChange = (val: string | undefined) => {
    setValues({ ...values, content: val });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: name === "categoryId" ? Number(value) : value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const validResult = validator(values);
    setErrors(validResult);
    // 에러가 발견되지 않으면 onSubmit
    if (Object.values(validResult).filter((e) => e !== "").length == 0) {
      await onSubmit(values);
    }
    setIsLoading(false);
  };

  return {
    values,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    mdEditorChange,
  };
}
