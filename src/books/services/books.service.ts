import { Injectable, Req } from '@nestjs/common';

@Injectable()
export class BooksService {
    public getBooks() {
        return [{ name: "Little queen" }, { name: "The green mountaun" }]
    }
}
