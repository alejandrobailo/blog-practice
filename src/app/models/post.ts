export class Post {
    title: string;
    text: string;
    author: string;
    image: string;
    date: Date;
    category: string;

    constructor(title: string, text: string, author: string, image: string, category: string) {
        this.title = title;
        this.text = text;
        this.author = author;
        this.image = image;
        this.date = new Date();
        this.category = category;
    }
}