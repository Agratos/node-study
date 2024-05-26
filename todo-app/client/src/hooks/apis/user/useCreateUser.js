import { useMutation } from "@tanstack/react-query";
import api from "../../../utils/api";

export const useCreateUserMutation = () => {
  const createUser = async ({ name, email, password }) => {
    const response = await api.post(`/user/register`, {
      name,
      email,
      password,
    });
    return response;
  };

  const { mutateAsync } = useMutation({
    mutationFn: ({ name, email, password }) =>
      createUser({ name, email, password }),
  });

  return { mutateAsync };
};
