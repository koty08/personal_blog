import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useTypedMutation = <TData = unknown, TVariables = void, TContext = unknown>(
  options: UseMutationOptions<TData, AxiosError<{ message: string }>, TVariables, TContext>
) => {
  return useMutation(options);
};
