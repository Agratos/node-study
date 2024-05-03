import { useQuery } from '@tanstack/react-query';
import api from '../../../utils/api';

export const useGetTodosQuery = () => {
	const getTodos = () => {
		return api.get(`/todos`);
	};

	return useQuery({
		queryKey: ['get-todos'],
		queryFn: getTodos,
		select: (res) => res.data.data,
	});
};
