import { Customer } from './customer';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export class DatabaseService {
	PHP_API_SERVER = "http://localhost/ang-php-mysql/api";
	constructor(private httpClient: HttpClient) {}
	// readProducts(): Observable<Customer[]>{
	// 	return this.httpClient.get<Customer[]>(`/index.php`);
	// }
	addCustomer(customer: Customer): Observable<Customer>{
		return this.httpClient.post<Customer>(`/add.php`, customer);
	}
	updateCustomer(customer: Customer){
		return this.httpClient.put<Customer>(`/update.php`, customer);
	}
	deleteCustomer(id: number){
		return this.httpClient.delete<Customer>(`/delete.php/?id=${id}`);
	}
}