export class Product {
    id: number; 
    name: string;
    price!: number;
    sizes:  Array<{ size: string; quantity: number  }> = [];
    image: File | string;
    categoryId?: number; 
    subCategoryId?: number;
    isFavorite: boolean;
    constructor(
        id: number,
        name: string,
        price: number,
        sizes: Array<{ size: string; quantity: number }>,
        image: File,
        categoryId?: number,
        subCategoryId?: number,
        isFavorite: boolean = false
    ) {
        this.name = name;
        this.price = price;
        this.sizes = sizes;
        this.image = image;
        this.categoryId = categoryId;
        this.subCategoryId = subCategoryId;
        this.id = id;
        this.isFavorite = isFavorite;

        
    }

}