import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dynamic-form';
  gridApi: any;
  columnApi: any;
  addSection: boolean;
  addFields:boolean;
  workSheetName:string;
  type:string;
  revisionNo:number;
  sectionName:string;
  sectionLayout:string;
  tableRowExpression:string;
  sectionVar:string;
  selectionOrder:number;
  formFieldName:string;
  //formFieldId:string;
  formFieldType:string;
  formFieldVar:string;
  formFieldOrder:number;
  formFieldExpression:string;
  formRequired:number;
  formValidation:string;
  formReadOnly:number;
  tableFieldName:string;
  //formFieldId:string;
  tableFieldOrder:number;
  tableFieldType:string;
  tableFieldVar:string;
  tableFieldExpression:string;
  tableequired:number;
  tableValidation:string;
  tableReadOnly:number;

  constructor(private http: HttpClient) { }


  getWorksheetName(params) {
    this.workSheetName = params.target.value;
  }
  getType(params) {
    this.type = params.target.value;
  }
  getRevisionNo(params) {
    this.revisionNo = params.target.value;
  }
  getSectionName(params) {
    this.sectionName = params.target.value;
  }
  getSectionLayout(params){
    this.sectionLayout=params.target.value;
  }
  getTableRowExpression(params){
    this.tableRowExpression=params.target.value;
  }
  getSectionVar(params){
    this.sectionVar=params.target.value;
  }
  getSelectionOrder(params){
    this.selectionOrder=params.target.value;
  }
  getFormFieldName(params){
    this.formFieldName=params.target.value;
  }
  getFormFieldOrder(params){
    this.formFieldOrder=params.target.value;
  }
  getFormFieldType(params){
    this.formFieldType=params.target.value;
  }
  getFormExpression(params){
    this.formFieldExpression=params.target.value;
  }
  getFormRequired(params){
    this.formRequired=params.target.value;
  }
  getFormValidation(params){
    this.formRequired=params.target.value;
  }
  getFormReadOnly(params){
    this.formReadOnly=params.target.value;
  }
  getTableFieldName(params){
    this.tableFieldName=params.target.value;
  }
  getTableFieldOrder(params){
    this.tableFieldOrder=params.target.value;
  }
  getTableFieldType(params){
    this.tableFieldType=params.target.value;
  }
  getTableExpression(params){
    this.tableFieldExpression=params.target.value;
  }
  getTableFieldRequired(params){
    this.tableequired=params.target.value;
  }
  getTableValidation(params){
    this.tableValidation=params.target.value;
  }
  getTableReadOnly(params){
    this.tableReadOnly=params.target.value;
  }

  addNewSection(){
    this.addSection=true;
    
  }

  editSection(){}

  deleteSection(){}

  addFormFields(){
    this.addFields=true;
    // this.http.post('http://localhost/add.php',{"id":this.cusId, "name":this.cusName, "location":this.cusLoc,
    //                   "salary":this.cusSal}).subscribe(data=>{
    //    });
  }

  addRowFields(){}

  preview(){
    
  }
}
