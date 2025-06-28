import { useQuery } from '@tanstack/react-query';
import agent from '../api/agent';
import type { ICategoryDto } from '../models/categoryDto';

export function useCategories() {
    return useQuery<ICategoryDto[], Error>({
        queryKey: ['categories'],
        queryFn: agent.Categories.list,
        staleTime: 1000 * 60 * 10,
    });
}