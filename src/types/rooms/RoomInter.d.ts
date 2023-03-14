export interface Room {
    id: number,
    name: string;
    typeRoom: string;
    description: string;
    photo: {};
    roomNumber: number;
    offer: number;
    price: number;
    discount?: number;
    cancellation: string;
    amenities: string;
    status: string;
    roomFloor: string
}