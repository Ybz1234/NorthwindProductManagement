import axios from "axios";
import type { AxiosResponse, AxiosError } from "axios";
import { toast } from "react-toastify";
import { store } from "../stores/store";
import { Router } from "../router/Routes";
import type { ICustomerOrder } from "../models/customerOrder";
import type { IProduct } from "../models/product";
import type { ISupplierDto } from "../models/supplierDto";
import type { ICategoryDto } from "../models/categoryDto";
import type { IProductDetailsDto } from "../models/productDetails";
import type { ICreateProductDto } from "../models/createProductDto";
import type { IExpensiveProductDto } from "../models/IExpensiveProductDto ";


const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
};

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.interceptors.response.use(async response => {
    if (import.meta.env.DEV) await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                Router.navigate('/not-found');
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key]);
                    }
                }
                throw modalStateErrors.flat();
            } else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error('Unauthorized');
            break;
        case 403:
            toast.error('Forbidden');
            break;
        case 404:
            Router.navigate('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            Router.navigate('/server-error');
            break;
    }
    return Promise.reject(error);
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;
type ApiResponse<T> = {
    isSuccess: boolean;
    value: T | null;
    error: any | null;
};
const responseBodyArray = <T>(response: AxiosResponse<ApiResponse<T>>): T | null => response.data.value;

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const requestsArray = {
    get: <T>(url: string) => axios.get<ApiResponse<T>>(url).then(responseBodyArray)
};

const Customers = {
    getOrderCounts: () => requests.get<ICustomerOrder[]>('/Customers/orders-count'),
};

const Products = {
    create: (dto: ICreateProductDto) => requests.post<void>('/Products', dto),
    getAll: () => requests.get<IProduct[]>('/Products'),
    getTopExpensive: () => requests.get<IExpensiveProductDto[]>('/Products/top-expensive'),
    getById: (id: number) => requestsArray.get<IProductDetailsDto>(`/Products/${id}`),
    update: (id: number, dto: Partial<IProductDetailsDto>) => requests.put<void>(`/Products/${id}`, dto),
    delete: (id: number) => requests.del<void>(`/Products/${id}`),
    exportCsv: () => axios.get('/Products/export-csv', { responseType: 'blob' }),
};

const Suppliers = {
    list: () => requests.get<ISupplierDto[]>('/Suppliers'),
};

const Categories = {
    list: () => requests.get<ICategoryDto[]>('/Categories'),
};

const agent = {
    Categories,
    Customers,
    Products,
    Suppliers
};

export default agent;