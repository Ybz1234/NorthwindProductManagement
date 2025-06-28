import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";

interface Store {
    commonStore: CommonStore;
    modalStore: ModalStore;
}

export const store: Store = {
    commonStore: new CommonStore(),
    modalStore: new ModalStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}