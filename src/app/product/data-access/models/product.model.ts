export interface Product {
    id: string,
    sku: string | undefined,
    name: string | undefined,
    description: string | undefined,
    stock: string | undefined,
    value: string | undefined
}

export interface NewProduct {
    sku: string | undefined,
    name: string | undefined,
    description: string | undefined,
    stock: string | undefined,
    value: string | undefined
}