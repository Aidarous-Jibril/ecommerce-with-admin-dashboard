export interface Billboard {
    id: string;
    label: string;
    imageUrl: string;
}
export interface Category {
    id: string;
    name: string;
    billboardId: Billboard;
}
export interface Subcategory {
    id: string;
    name: string;
    categoryId: Category;
}
export interface Childcategory {
    id: string;
    name: string;
    subcategoryId: Subcategory;
}

export interface Brand {
    id: string;
    name: string;
    subcategoryId: Subcategory;
}

export interface Size {
    id: string;
    name: string;
    value: string;
}

export interface Color {
    id: string;
    name: string;
    value: string;
}

export interface Image {
    id: string;
    url: string;
}

export interface Product {
    id: string,
    subcategory: Subcategory,
    name: string,
    price: string,
    size: Size,
    color: Color,
    brand: Brand,
    images: Image[],
    isFeatured: boolean,
    //isArchived: boolean,
}