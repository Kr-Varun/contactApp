import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent  implements OnInit{
  // title = 'contact-app';
  contacts = [];
  openModal = false;
  pNo: string;
  fName: string;
  lName: string;
  email: string;
  status: string;
  isEditMode: boolean;
  editIndex;
  constructor(private contactService: ContactService){

  }

  ngOnInit(): void {
    this.contactService.getContactList().subscribe(
      (data: Array<object>) =>{
        this.contacts = data;
      });
  }

  deleteContactDetails(item,index){
    //hit webservice to delete the contact
     this.contacts.splice(index, 1);
  }

  addContactDetails(value){
    if(this.isEditMode){
      this.contacts[this.editIndex]['firstName'] = value.fName;
      this.contacts[this.editIndex]['lastName'] = value.lName;
      this.contacts[this.editIndex]['email'] = value.email;
      this.contacts[this.editIndex]['phoneNumber'] = value.pNo;
      this.contacts[this.editIndex]['status'] = value.status;

    }
    else{
      this.contacts.push({
      "firstName": value.fName,
      "lastName": value.lName,
      "email": value.email,
      "phoneNumber": value.pNo,
      "status": value.status
      });

    }
    
    this.openModal = false;
    this.resetFormModel();
  }

  editContactDetails(item, index){
    this.fName = item.firstName;
    this.lName = item.lastName;
    this.email = item.email;
    this.pNo = item.phoneNumber;
    this.status = item.status;

    this.isEditMode = true;
    this.editIndex = index;

    this.openModal = true;
  }


  resetFormModel(){
    this.fName = '';
    this.lName = '';
    this.email = '';
    this.pNo = '';
    this.status = '';
  }
}
