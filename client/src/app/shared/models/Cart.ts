export class Cart {
    id!: string;
    name!: string;
    originalPrice!: number;
    price!: number;
    tags?: string[];
    stars!: number;
    imageUrl!: string;
    unitCapitity!: number;
    unitPrice!: number;
    Upc!: string;
    Descriptions!: string;
    address!: string;
    promotions!: string;
    added!: boolean;
    addedSugar!: boolean;
    productQuantityAddDefault!: number;
}