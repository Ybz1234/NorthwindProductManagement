import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import type { ICustomerOrder } from "../models/customerOrder";

export default class CustomerStore {
    customers: ICustomerOrder[] = [];
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadCustomerOrderCounts = async () => {
        this.loadingInitial = true;
        try {
            const customers = await agent.Customers.getOrderCounts();
            runInAction(() => {
                this.customers = customers ?? [];
                this.loadingInitial = false;
            });
        } catch (error) {
            console.error("Failed to load customer order counts", error);
            runInAction(() => {
                this.loadingInitial = false;
            });
        }
    };
}