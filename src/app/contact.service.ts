import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class ContactService {
    constructor(private http: HttpClient){
    }

    getContactList(){
       return this.http.get('assets/contact.json');
    }

}