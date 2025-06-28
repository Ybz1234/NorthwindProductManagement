import { useQuery } from '@tanstack/react-query';
import agent from '../api/agent';
import type { ISupplierDto } from '../models/supplierDto';

export function useSuppliers() {
  return useQuery<ISupplierDto[], Error>({
    queryKey: ['suppliers'],
    queryFn: agent.Suppliers.list,
    staleTime: 1000 * 60 * 10,
  });
}