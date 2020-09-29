import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RowNode } from 'ag-grid-community';
import { FormFields } from './FormFields';
import { Sections } from './Sections';
import { TableFields } from './TableFields';
import { Worksheets } from './Worksheets';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dynamic-form';

  rowData;
  formRowData;
  tableRowData;
  worksheets=[];
  editable:boolean=true;
  preview:boolean=false;
  worksheetsGridData=[];
  gridApi: any;
  columnApi: any;
  formGridApi: any;
  formColumnApi: any;
  tableGridApi: any;
  tableColumnApi: any;
  selectedNodes: RowNode[];
  addWorksheet:boolean;
  addSection: boolean;
  addFields:boolean;
  editFields:boolean;
  workSheetName:string;
  type:string;
  revisionNo:string;
  worksheetVar:string;
  sectionName:string;
  sectionLayout:string;
  tableRowExpression:string;
  sectionVar:string;
  selectionOrder:number;
  formFieldName:string;
  formFieldType:string;
  formFieldVar:string;
  formFieldOrder:number;
  formFieldExpression:string;
  formRequired:number;
  formValidation:number;
  formReadOnly:number;
  tableFieldName:string;
  tableFieldOrder:number;
  tableFieldType:string;
  tableFieldVar:string;
  tableFieldExpression:string;
  tableRequired:number;
  tableValidation:number;
  tableReadOnly:number;
  rowNumberHeader:string;
  rowNumberValue:number;
  result:number=0;
  editableNodes: RowNode[];
  tableExp:string;
  firstValue:number;
  secondValue:number;
  rowIndex:number;
  tableFieldsList=[];
  expressionMap  = new Map<string, string>();
  variableMap={};
  valueMap={};
  constructor(private http: HttpClient,private router: Router) {}

  ngOnInit() {
    this.worksheets.push('Worksheet1','Worksheet2','ffsdf');
    this.addWorksheet=false;
    this.editable=true;
    let  rowCount=1;
    this.http.get<Worksheets[]>('http://localhost/readWorksheet.php').subscribe((worksheets: Worksheets[])=>{
      this.worksheetsGridData.push(worksheets);
     this.rowData=worksheets;
     rowCount=rowCount+1;
  });
  }
  
  addNewWorksheet(){
    this.addWorksheet=true;
    this.editable=true;
    this.editFields=false;

  }

  editWorksheet(){
    const selectedRow = this.gridApi.getSelectedRows();
    if(selectedRow.length!=0){
      this.addWorksheet=true;
      this.addFields=false;
      this.addSection=true;
      this.editFields=true;
      this.editable=false;
      const wname = selectedRow[0].wname;
      this.http.post<Worksheets[]>('http://localhost/readWorksheet.php',{"wname":wname}).subscribe((worksheets: Worksheets[])=>{
        this.getWorksheetData(worksheets); 
        this.http.post<Sections[]>('http://localhost/readSection.php',{"wname":wname}).subscribe((sections: Sections[])=>{
          this.getSectionData(sections);
          this.http.post<FormFields[]>('http://localhost/readFormFields.php',{"secName":this.sectionName}).subscribe((formFields: FormFields[])=>{
            this.formRowData=formFields;          
          this.http.post<TableFields[]>('http://localhost/readTableField.php',{"secName":this.sectionName}).subscribe((tableFields: TableFields[])=>{
           
            this.tableRowData=tableFields;
            
          });
          
      });
      });
      });
    }
  }

  deleteWorksheet() {
    const selectedRow = this.gridApi.getSelectedRows();
    if (selectedRow.length != 0) {
      this.gridApi.applyTransaction({ remove: selectedRow });
      const wname = selectedRow[0].wname;
      this.deleteRowFields();
      this.deleteTableFields();
      this.http.post('http://localhost/deleteSection.php', { "wname": wname }).subscribe(data => { });
      this.http.post('http://localhost/deleteWorkSheet.php', { "wname": wname }).subscribe(data => { });
    }

  }

  cancelWorksheet(){

    this.addWorksheet=false;
    this.addSection=false;
    this.addFields=false;
    this.ngOnInit();
  }


  getWorksheetName(params) {
    this.workSheetName = params.target.value;
  }
  getType(params) {
    this.type = params.target.value;
  }
  getRevisionNo(params) {
    this.revisionNo = params.target.value;
  }
  getWorksheetVar(params) {
    this.worksheetVar = params.target.value;
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
  getFormFieldVar(params){
    this.formFieldVar=params.target.value;
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
  getTableFieldVar(params){
    this.tableFieldVar=params.target.value;
  }
  getTableExpression(params){
    this.tableFieldExpression=params.target.value;
  }
  getTableFieldRequired(params){
    this.tableRequired=params.target.value;
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
  }

  addRowFields() {
    this.http.post('http://localhost/formFields.php', {
      "formFieldName": this.formFieldName, "secName": this.sectionName,
      "formFieldOrder": this.formFieldOrder, "type": this.formFieldType,
      "expression": this.formFieldExpression, "var": this.formFieldVar, "required": this.formRequired,
      "validation": this.formValidation, "readOnly": this.formReadOnly
    }).subscribe(data => {
    });
  }

  editRowFields(){
    if(this.editableNodes != null || this.editableNodes != undefined){
      this.formGridApi.updateRowData({
        edit: [{ formFieldName: this.editableNodes['formFieldName'], 
        tableFieldOrder: this.editableNodes['tableFieldOrder'], type: this.editableNodes['type'],
        expression: this.editableNodes['expression'], var: this.editableNodes['var'],
        required: this.editableNodes['required'], validation: this.editableNodes['validation'],
        readOnly: this.editableNodes['readOnly'] }]
      });
      this.http.put('http://localhost/updateFormField.php',{"formFieldName":this.editableNodes['formFieldName'], 
                        "secName":this.sectionName, "formFieldOrder":this.editableNodes['formFieldOrder'],
                      "type":this.editableNodes['type'],"expression":this.editableNodes['expression'],
                      "var":this.editableNodes['var'],"required":this.editableNodes['required'],"validation":this.editableNodes['validation'],
                      "readOnly":this.editableNodes['readOnly']}).subscribe(data=>{
       });
    }
  }

  

  addTableFields(){
    this.http.post('http://localhost/tableField.php',{"tableFieldName":this.tableFieldName, "secName":this.sectionName, 
                      "tableFieldOrder":this.tableFieldOrder, "type":this.tableFieldType,
                      "expression":this.tableFieldExpression,"var":this.tableFieldVar,"required":this.tableRequired,
                      "validation":this.tableValidation,"readOnly":this.tableReadOnly}).subscribe(data=>{
       });

  }

  editTableFields() {
    if (this.editableNodes != null || this.editableNodes != undefined) {
      this.tableGridApi.updateRowData({
        edit: [{
          tableFieldName: this.editableNodes['tableFieldName'], secName: this.editableNodes['secName'],
          tableFieldOrder: this.editableNodes['tableFieldOrder'], type: this.editableNodes['type'],
          expression: this.editableNodes['expression'], var: this.editableNodes['var'],
          required: this.editableNodes['required'], validation: this.editableNodes['validation'],
          readOnly: this.editableNodes['readOnly']
        }]
      });
      this.http.put('http://localhost/updateTableField.php', {
        "tableFieldName": this.editableNodes['tableFieldName'],
        "secName": this.sectionName, "tableFieldOrder": this.editableNodes['tableFieldOrder'],
        "type": this.editableNodes['type'], "expression": this.editableNodes['expression'],
        "var": this.editableNodes['var'], "required": this.editableNodes['required'], "validation": this.editableNodes['validation'],
        "readOnly": this.editableNodes['readOnly']
      }).subscribe(data => {
      });
    }
  }


 

  deleteRowFields(){
    if(this.formGridApi!= undefined){
      const selectedRow = this.formGridApi.getSelectedRows();
    if(selectedRow.length!=0){
      this.formGridApi.applyTransaction({ remove: selectedRow });
      const formFieldName=selectedRow[0].formFieldName;
      this.http.post('http://localhost/deleteFormField.php',{"id":formFieldName}).subscribe(data=>{});
    } else {
      console.log('Please select a row to delete');
    }
    }
  }

  deleteTableFields(){
    if(this.tableGridApi!= undefined){
      const selectedRow = this.tableGridApi.getSelectedRows();
      if(selectedRow.length!=0){
        this.tableGridApi.applyTransaction({ remove: selectedRow });
        const tableFieldName=selectedRow[0].tableFieldName;
        this.http.post('http://localhost/deleteTableField.php',{"id":tableFieldName}).subscribe(data=>{});
      } else {
        console.log('Please select a row to delete');
      }
    }
    
  }

  

  


  cancelSection(){

  }

  columnDefs = [
    { headerName: 'Worksheet No', field: 'no', editable: false },
    { headerName: 'Worksheet Name', field: 'wname', editable: false }
  ];
  
  formColumnDefs=[
    { headerName: 'Name', field: 'formFieldName', editable: false },
    { headerName: 'Form Field Order', field: 'formFieldOrder', editable: true },
    { headerName: 'Type', field: 'type', editable: true },
    { headerName: 'Var', field: 'var', editable: true },
    { headerName: 'Expression', field: 'expression', editable: true },
    { headerName: 'Required', field: 'required', editable: true },
    { headerName: 'Validation', field: 'validation', editable: true },
    { headerName: 'Read Only', field: 'readOnly', editable: true }
  ];

  tableColumnDefs=[
    { headerName: 'Name', field: 'tableFieldName', editable: false },
    { headerName: 'Table Field Order', field: 'tableFieldOrder', editable: true },
    { headerName: 'Type', field: 'type', editable: true },
    { headerName: 'Var', field: 'var', editable: true },
    { headerName: 'Expression', field: 'expression', editable: true },
    { headerName: 'Required', field: 'required', editable: true },
    { headerName: 'Validation', field: 'validation', editable: true },
    { headerName: 'Read Only', field: 'readOnly', editable: true }
  ];

  rowSelection = 'single';

    onGridReady(params) {
      this.gridApi = params.api;
      this.columnApi = params.columnApi;
  
    }
    onFormGridReady(params) {
      this.formGridApi = params.api;
      this.formColumnApi = params.columnApi;
  
    }
    onTableGridReady(params) {
      this.tableGridApi = params.api;
      this.tableColumnApi = params.columnApi;
  
    }

    

    onRowSelected(event) {
      if (event.node.selected) {
        this.selectedNodes = event.node.data;
      }
    }

    previewWorksheet(){
      const selectedRow = this.gridApi.getSelectedRows();
      if(selectedRow.length!=0){
        this.addWorksheet=true;
        this.preview=true;
        this.addSection=true;
        const wname = selectedRow[0].wname;
      this.http.post<Worksheets[]>('http://localhost/readWorksheet.php',{"wname":wname}).subscribe((worksheets: Worksheets[])=>{
        this.getWorksheetData(worksheets);
        this.http.post<Sections[]>('http://localhost/readSection.php',{"wname":wname}).subscribe((sections: Sections[])=>{
          this.getSectionData(sections);
          this.http.post<FormFields[]>('http://localhost/readFormFields.php',{"secName":this.sectionName}).subscribe((formFields: FormFields[])=>{
           this.rowNumberHeader=formFields[0].formFieldName;
          this.http.post<TableFields[]>('http://localhost/readTableField.php',{"secName":this.sectionName}).subscribe((tableFields: TableFields[])=>{
          this.tableColumnDefs=[];
         
          this.tableColumnDefs.push({ headerName: 'No', field: 'no', editable: false });
          this.tableFieldsList.push(tableFields);
          for(let i=0;i<tableFields.length;i++){
            const isEditable=tableFields[i].readOnly==1?false:true;
            this.tableColumnDefs.push({ headerName: tableFields[i].tableFieldName, field: tableFields[i].var, editable: isEditable });
            const variableName = tableFields[i].var;
            this.expressionMap[variableName]=tableFields[i].expression;
          } 
 
          });
          
      });
      });
      });
      }
      
    }
    

  private getSectionData(sections: Sections[]) {
    this.sectionName = sections[0].secName;
    this.sectionVar = sections[0].var;
    this.selectionOrder = sections[0].selectionOrder;
    this.tableRowExpression = sections[0].selectionOrder.toString();
  }

  private getWorksheetData(worksheets: Worksheets[]) {
    this.workSheetName = worksheets[0].wname;
    this.type = worksheets[0].type;
    this.worksheetVar = worksheets[0].var;
    this.revisionNo = worksheets[0].revisionNo;
  }

    onCellDoubleClick(params){
      if(this.preview){
        this.rowIndex = params.rowIndex;
      }
    }

    cancelPreview(){
      this.preview=false;
      this.ngOnInit();
    }

  splitExpsn(s: string) {
    let array;
    const operator = "/*+-^";
    for (var i = 0; i < operator.length; i++) {
      if (i == 0) {
        array = s.split(operator[i]);
      }
      else {
        array = array.toString().split(operator[i]);
      }
    }
    return array;
  }

 
    setValue(){
      let result = 0;
      const rowNode = this.tableGridApi.getRowNode(this.rowIndex);
      const selectedRow = this.tableGridApi.getSelectedRows();
      const keys = Object.keys(this.expressionMap);
      keys.forEach(k => {
        let val = this.expressionMap[k];
        if(val!=''){
         const a= this.splitExpsn(val);
         const variables = a[0].split(',');
         console.log(variables);
         for (let i = 0; i < variables.length; i++) {
           if(selectedRow[0][variables[i]]){
            val=val.replace(variables[i],selectedRow[0][variables[i]]);
           }
        }
        result=eval(val);
        if(result==undefined||NaN){
          rowNode.setDataValue(k, 0);
        }else{
          rowNode.setDataValue(k, result);
        }
        
        }
        
      });
    }

    onCellValueChange(params) {

      const rowIndex = params.rowIndex;
      const oldValue = params.oldValue;
      const newValue = params.newValue;
      const field = params.colDef.field;
      this.editableNodes = this.selectedNodes;
      this.editableNodes[field] = newValue;
    }
    

    getRowNumber(params){
      this.rowNumberValue=params.target.value;
      let data = [];
            for (let i = 1; i <= this.rowNumberValue; i++) {
              data.push({
                no: i
              });
            }
            
            this.tableRowData=data;

    }

    onSubmitChanges(){
      this.http.put('http://localhost/updateSection.php',{"wname":this.workSheetName, "secName":this.sectionName, 
                      "layout":this.sectionLayout, "var":this.sectionVar,
                      "selectionOrder":this.tableRowExpression,"noOfFormFields":1,
                      "noOfTableFields":3}).subscribe(data=>{
       });
       this.http.put('http://localhost/updateWorksheet.php',{"wname":this.workSheetName, "type":this.type, 
                      "layout":'hhh', "revisionNo":this.revisionNo,
                      "var":this.worksheetVar,"noOfSections":1}).subscribe(data=>{
       });
      this.ngOnInit();
    }

    onSubmit(){
       this.http.post('http://localhost/addSection.php',{"wname":this.workSheetName, "secName":this.sectionName, 
                      "layout":this.sectionLayout, "var":this.sectionVar,
                      "selectionOrder":this.selectionOrder,"noOfFormFields":1,
                      "noOfTableFields":3}).subscribe(data=>{
       });
       this.http.post('http://localhost/addWorksheet.php',{"wname":this.workSheetName, "type":this.type, 
                      "layout":'hhh', "revisionNo":this.revisionNo,
                      "var":this.worksheetVar,"noOfSections":1}).subscribe(data=>{
       });

       this.ngOnInit();
    }
}
