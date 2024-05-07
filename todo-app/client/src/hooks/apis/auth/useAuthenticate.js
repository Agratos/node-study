import { useQuery } from '@tanstack/react-query';
import api from '../../../utils/api';

export const useAuthenticateQuery = ({ token }) => {
	const getAuthenticate = () => {
		return api.get(`/user`);
	};

	return useQuery({
		queryKey: ['get-authenticate', token],
		queryFn: getAuthenticate,
		select: (res) => res.data,
	});
};
