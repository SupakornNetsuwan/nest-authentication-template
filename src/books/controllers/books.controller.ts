import { Controller, Get, Req, Res } from '@nestjs/common';
import { BooksService } from '../services/books.service';
import { Request, Response } from 'express';

@Controller('/api/books')
export class BooksController {

    constructor(private booksService: BooksService) { }

    @Get()
    public async getBooks(@Req() req: Request, @Res() res: Response) {
        const books = this.booksService.getBooks()
        
        return res.send(books)
    }
}
