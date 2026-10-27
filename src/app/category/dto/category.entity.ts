export class CategoryEntity {
    id: string;
    name: string;
    slug: string;
    parentId: string | null;

    constructor(data: {
         id: string;
        name: string;
        slug: string;
        parentId: string | null;
    }){
        this.id = data.id;
        this.name = data.name;
        this.slug = data.slug;
        this.parentId = data.parentId;
    }
}