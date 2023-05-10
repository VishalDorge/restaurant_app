
export interface IRestaurant{
    _id ? : string;
    name : string;
    location : string;
    ownerId : string;
    branches?: string[];
    menu? : IFoodItem[];
    status?: "0" | "1" | "-1";
}

export interface IFoodItem{
    itemName: string;
    itemPrice: string;
}