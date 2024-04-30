import { useMutation } from '@tanstack/react-query';
import api from '../../utils/api';
import { useGetTodosQuery } from './useGetTodos';

export const useUpdateTodoMutation = () => {
	const { refetch: getTodos } = useGetTodosQuery();

	const updateTodo = ({ id, isComplete }) => {
		return api.patch(`/todos/${id}`, { isComplete: !isComplete });
	};

	const { mutate } = useMutation({
		mutationFn: ({ id, isComplete }) => updateTodo({ id, isComplete }),
		onSuccess: () => getTodos(),
	});

	return { mutate };
};
