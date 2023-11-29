import { Injectable, Req } from '@nestjs/common';
import { AuthenticationService } from 'core/services/authentication.service';

@Injectable()
export class BooksService {
    
    constructor(private readonly authenticationService: AuthenticationService) { }

    public getBooks() {
        return [{ name: "Little queen" }, { name: "The green mountaun" }]
    }
}
