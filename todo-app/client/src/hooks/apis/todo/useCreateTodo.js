import { useMutation } from '@tanstack/react-query';
import api from '../../../utils/api';
import { useGetTodosQuery } from './useGetTodos';

export const useCreateTodoMutation = () => {
	const { refetch: getTodos } = useGetTodosQuery();

	const createTodo = ({ todo, isComplete }) => {
		return api.post(`/todos`, { todo, isComplete });
	};

	const { mutate } = useMutation({
		mutationFn: ({ todo, isComplete }) => createTodo({ todo, isComplete }),
		onSuccess: () => getTodos(),
	});

	return { mutate };
};
