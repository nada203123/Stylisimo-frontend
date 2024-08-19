// src/app/models/order.model.ts

import { Product } from "./Product";

export class Order {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    governorate: string;
    address: string;
    postalCode: string;
    userId: number;
    products: Product[]; 

    constructor(
        id: number,
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string,
        governorate: string,
        address: string,
        postalCode: string,
        userId: number,
        products: Product[]
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.governorate = governorate;
        this.address = address;
        this.postalCode = postalCode;
        this.userId = userId;
        this.products = products;
    }
}
