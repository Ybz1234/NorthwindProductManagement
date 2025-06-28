import { useQuery } from '@tanstack/react-query';
import agent from '../api/agent';
import type { IProduct } from '../models/product';

export const queryKeys = {
    products: {
        all: ['products'] as const,
    },
};

export function useProducts() {
    return useQuery<IProduct[], Error>({
        queryKey: queryKeys.products.all,
        queryFn: () => agent.Products.getAll(),
        staleTime: 1000 * 60 * 5,
    });
}