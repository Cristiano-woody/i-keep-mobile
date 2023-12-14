import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { note } from 'src/app/entities/note';

@Injectable({
  providedIn: 'root'
})

export class NoteService {

  private urlNote: string = 'http://localhost:8080/note'

  constructor(private http: HttpClient) { }

  findAll(): Observable<note[]> {
    const headers = new HttpHeaders({
      'Authorization': window.localStorage.getItem('authToken') ?? ''
    });
    return this.http.get<note[]>(this.urlNote + "/" + window.localStorage.getItem("userId"), {headers: headers})
  }

  delete(noteId: string): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': window.localStorage.getItem('authToken') ?? ''
    });
    return this.http.delete<void>(this.urlNote + "/" + noteId, {headers: headers})
  }

  update({noteId, title, description} : { noteId: string, title: string, description: string}): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': window.localStorage.getItem('authToken') ?? ''
    });
    return this.http.patch<void>(this.urlNote + "/" + noteId, { title: title, description: description} , {headers: headers})
  }

  save(data: {title: string, description: string}): Observable<note> {
    const headers = new HttpHeaders({
      'Authorization': window.localStorage.getItem('authToken') ?? ''
    });
    return this.http.post<note>(this.urlNote, {title: data.title, description: data.description, userId: window.localStorage.getItem('userId')} , {headers: headers})
  }
}