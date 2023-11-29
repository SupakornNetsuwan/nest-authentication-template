import { Controller, Get, Param, ParseIntPipe, Req, Res, UseGuards } from '@nestjs/common';
import { BooksService } from '../services/books.service';
import { Request, Response } from 'express';
import { AuthenticationService } from 'core/services/authentication.service';
import { AuthenticationGuard } from 'core/guards/authentication.guard';

@Controller('/api/books')

export class BooksController {

    constructor(private readonly booksService: BooksService, private readonly authenticationService: AuthenticationService) { }

    @Get()
    @UseGuards(AuthenticationGuard)
    public async getBooks(@Req() req: Request, @Res() res: Response) {
        const books = this.booksService.getBooks()
        const userId = this.authenticationService.getUserId();

        // console.log(userId)

        return res.send(books)
    }

    @Get(":id")
    @UseGuards(AuthenticationGuard)
    public getBook(@Req() req: Request, @Res() res: Response, @Param("id", ParseIntPipe) id: number) {
        return res.send(`Get book ID : ${id}`)
    }
}
