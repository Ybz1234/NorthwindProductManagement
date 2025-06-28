import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import agent from '../api/agent';
import type { ICustomerOrder } from '../models/customerOrder';

export const queryKeys = {
    customers: {
        base: ['customers'] as const,
        orderCounts: () => [...queryKeys.customers.base, 'orderCounts'] as const
    }
};

export function useCustomerOrderCounts(
    options?: UseQueryOptions<ICustomerOrder[], Error>
) {
    return useQuery<ICustomerOrder[], Error>({
        queryKey: queryKeys.customers.orderCounts(),
        queryFn: () => agent.Customers.getOrderCounts().then(data => data ?? []),
        staleTime: 1000 * 60 * 5,
        ...options
    });
}