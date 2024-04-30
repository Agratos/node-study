import { useMutation } from '@tanstack/react-query';
import api from '../../utils/api';
import { useGetTodosQuery } from './useGetTodos';

export const useDeleteTodoMutation = () => {
	const { refetch: getTodos } = useGetTodosQuery();

	const deleteTodo = (id) => {
		return api.delete(`/todos/${id}`);
	};

	const { mutate } = useMutation({
		mutationFn: (id) => deleteTodo(id),
		onSuccess: () => getTodos(),
	});

	return { mutate };
};
