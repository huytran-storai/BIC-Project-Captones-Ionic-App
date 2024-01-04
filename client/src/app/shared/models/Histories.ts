// export class Product {
//     nameProduct!: string;
//     originalPrice!: number;
//     price!: number;
// }

export class Histories {
    id!: string;
    date!: string;
    pricetotal!: number;
    status!: string;
    paymentMethod!: string;
    products?: {
        name: string;
        originalPrice: number;
        price: number;
        quantity: number;
    }[];
}
