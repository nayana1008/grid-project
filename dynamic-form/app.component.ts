import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dynamic-form';
  addSection: boolean;
  addFields:boolean;

  addNewSection(){
    this.addSection=true;
  }

  editSection(){}

  deleteSection(){}

  addFormFields(){
    this.addFields=true;
  }

  addRowFields(){}
}
