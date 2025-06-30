import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import type { ISupplierDto } from "../models/supplierDto";
import type { ICategoryDto } from "../models/categoryDto";

interface ServerError {
    message: string;
    details?: string;
}

export default class CommonStore {
    error: ServerError | null = null;
    token: string | null | undefined = localStorage.getItem('jwt');
    appLoaded = false;
    loadingInitial = false;
    suppliers: ISupplierDto[] = [];
    categories: ICategoryDto[] = [];

    constructor() {
        makeAutoObservable(this);

        reaction(() => this.token, (token: string | null | undefined) => {
            if (token) {
                localStorage.setItem('jwt', token);
            } else {
                localStorage.removeItem('jwt');
            }
        });
    }

    loadSuppliers = async () => {
        this.loadingInitial = true;
        try {
            const suppliers = await agent.Suppliers.list();
            runInAction(() => {
                this.suppliers = suppliers ?? [];
                this.loadingInitial = false;
            });
        } catch (error) {
            console.error("Failed to load suppliers", error);
            runInAction(() => {
                this.loadingInitial = false;
            });
        }
    };

    loadCategories = async () => {
        this.loadingInitial = true;
        try {
            const categories = await agent.Categories.list();
            runInAction(() => {
                this.categories = categories ?? [];
                this.loadingInitial = false;
            });
        } catch (error) {
            console.error("Failed to load categories", error);
            runInAction(() => {
                this.loadingInitial = false;
            });
        }
    };

    setServerError(error: ServerError) {
        this.error = error;
    }

    setToken = (token: string | null) => {
        this.token = token;
    };

    setAppLoaded = () => {
        this.appLoaded = true;
    };
}