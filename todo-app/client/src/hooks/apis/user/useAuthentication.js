import { useQuery } from '@tanstack/react-query';
import api from '../../../utils/api';

export const useAuthenticationQuery = ({ token }) => {
	const getTodos = () => {
		return api.get(`/user/session`);
	};

	return useQuery({
		queryKey: ['authentication', token],
		queryFn: getTodos,
		select: (res) => res.data,
	});
};
