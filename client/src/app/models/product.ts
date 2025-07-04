export interface IProduct {
    productID: number;
    productName: string;
    category: string;
    supplier: string;
    unitPrice: number;
    unitsInStock: number;
    hasOrders: boolean;
}