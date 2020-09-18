import { Customer } from './customer';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn:'root',
})
export class DatabaseService {
	PHP_API_SERVER = "phpmysql";
	constructor(private httpClient: HttpClient) {}
	addCustomer(customer: Customer): Observable<Customer>{
		return this.httpClient.post<Customer>(`${this.PHP_API_SERVER}/add.php`, customer);
	}
	updateCustomer(customer: Customer){
		return this.httpClient.put<Customer>(`${this.PHP_API_SERVER}/update.php`, customer);
	}
	deleteCustomer(id: number){
		return this.httpClient.delete<Customer>(`${this.PHP_API_SERVER}/delete.php/?id=${id}`);
	}
}