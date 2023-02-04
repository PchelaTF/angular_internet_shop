export interface IFbResponse {
    name: string
}

export interface IProduct{
    date: Date
    info: string
    photo: string
    price: string
    title: string
    type: string
    id?: string
}

export interface IOrder {
    adress: string
    date: Date
    name: string
    orders: IProduct[]
    payment: string
    phone: string
    price: string
    id?: string
}

export interface IObjectKeys {
    [key: string]: IProduct;
}

export interface  IObjectKeysOrders {
    [key: string]: IOrder;
}
