import { useMutation } from '@tanstack/react-query';
import api from '../../../utils/api';

export const useLoginWithEmailMutation = () => {
	const loginWithEmail = async ({ email, password }) => {
		const response = await api.post(`/user/login`, { email, password });
		return response;
	};

	const { mutateAsync } = useMutation({
		mutationFn: ({ email, password }) => loginWithEmail({ email, password }),
	});

	return { mutateAsync };
};
