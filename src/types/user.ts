export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email?: string; // Email field for user creation
    gender?: string | null;
    height?: number | null;
    weight?: number | null;
    dateOfBirth?: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
    addressId?: number;
    address?: Address;
    cnp?: string;
}

export interface Address {
    id?: number; // Optional for creation, required for updates
    country?: string | null;
    county: string;
    city: string;
    postalCode: string;
    street: string;
    houseNumber: string;
    block?: string | null;
    entranceNumber?: string | null;
    floor?: string | null;
    apartmentNumber?: string | null;
} 