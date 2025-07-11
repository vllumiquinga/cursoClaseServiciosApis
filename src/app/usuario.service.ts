import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './app';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly apiUrl = environment.api_user //Obtiene el dato del enviromento
  private http = inject(HttpClient);

  private jsonHeader = new HttpHeaders({ 'Contect-Type': 'application/json' });

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl, {
      headers: this.jsonHeader
    });

    /*.pipe(
      map((raw) => raw.reverse())
    );*/
  }

  addUser(newUser: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/add`, newUser, {
      headers: this.jsonHeader
    });
  }

  updateUser(updateUser: User): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/update`, updateUser, {
      headers: this.jsonHeader
    });
  }

  deleteUser(idUser:number): Observable<User>{
    return this.http.delete<User>(`${this.apiUrl}/delete/${idUser}`, {
      headers:this.jsonHeader
    });
  }



}
