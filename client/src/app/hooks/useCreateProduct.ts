import { useMutation } from '@tanstack/react-query';
import agent from '../api/agent';
import type { ICreateProductDto } from '../models/createProductDto';

export function useCreateProduct() {
    return useMutation<void, Error, ICreateProductDto>({
        mutationFn: (dto) => agent.Products.create(dto),
    });
}