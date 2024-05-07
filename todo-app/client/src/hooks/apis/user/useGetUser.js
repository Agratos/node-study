import { useQuery } from '@tanstack/react-query';
import api from '../../../utils/api';

export const useGetUserQuery = ({ token }) => {
	const getUser = () => {
		return api.get(`/user`);
	};

	return useQuery({
		queryKey: ['get-user', token],
		queryFn: getUser,
		select: (res) => res.data?.user,
		enabled: !!token,
	});
};
