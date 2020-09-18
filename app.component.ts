import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';;
import { RowNode } from 'ag-grid-community';
import { DatabaseService } from './database.service';
import { Customer } from './customer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   cusId:number;
   cusName:string;
   cusLoc:string;
   cusSal:number;
  gridApi:any;
  columnApi:any;
  selectedNodes: RowNode[];  
  customer: Customer[];
  selectedCustomer: Customer = { id : null , name: null, location: null,salary:null};
  //private rowSelection;
 

  constructor( private http: HttpClient,private databaseService: DatabaseService) { }

  
  columnDefs = [
        { headerName: 'Customer ID', field: 'number',editable:"true" },
        { headerName: 'Customer Name', field: 'data',editable:"true" },
        { headerName: 'Location', field: 'data',editable:"true" },
        { headerName: 'Salary', field: 'number' ,editable:"true" }];
         

        rowData = [
          { number: 123, data: 'AAA', data1: 'XXX', number1: 10000 },
          { number: 124, data: 'AAA', data1: 'XXX', number1: 10000 },
          { number: 122, data: 'AAA', data1: 'XXX', number1: 10000 },
          { number: 121, data: 'AAA', data1: 'XXX', number1: 10000 },

      ];

    rowSelection = 'single';
      onGridReady(params) {
        this.gridApi=params.api;
        this.columnApi=params.columnApi;
        //this.

      }

      onRowSelected(event) {
        if(event.node.selected) {
           this.selectedNodes=event.node.data;
        }
        console.log(this.selectedNodes);
     }

     onCellClick(event){

     }

      addCustomer() {
        this.gridApi.updateRowData({
          add: [{number:this.cusId, data:this.cusName, data1:this.cusLoc, number1:this.cusSal}]
        });
        this.selectedCustomer.id=this.cusId;
        this.selectedCustomer.name=this.cusName;
        this.selectedCustomer.location=this.cusLoc;
        this.selectedCustomer.salary=this.cusSal;
        this.databaseService.addCustomer(this.selectedCustomer).subscribe((customer: Customer)=>{
          // this.databaseService.readProducts().subscribe((customer: Customer[])=>{
          //   this.customer = customer;
          // })
        });
        


      }
      editCustomer() {

      }

       
      importDetails(){
      }

      

      exportDetails() {
        var params = {
          suppressQuotes: undefined,
          columnSeparator: undefined,
          customHeader: undefined,
          customFooter: undefined
      };
        this.gridApi.exportDataAsCsv(params);
      }

      getId(params){
        this.cusId=params.target.value;
      }
      getName(params){
        this.cusName=params.target.value;
      }
      getLoc(params){
        this.cusLoc=params.target.value;
      }
      getSal(params){
        this.cusId=params.target.value;
      }
      deleteCustomer() {
        const sel = this.gridApi.getSelectedRows();
        this.gridApi.applyTransaction({remove: sel});
        const id=sel.number;
        this.databaseService.deleteCustomer(id).subscribe((customer: Customer)=>{
          console.log("Deleted, ", customer);
          // this.databaseService.readProducts().subscribe((customer: Customer[])=>{
          //   this.customer = customer;
          // })
        });
        
      }
}
