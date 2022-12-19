import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  apiUrl = "http://localhost:8083";

  constructor(private http:HttpClient) { }

  upload(file: any): Observable<any> {

    const dataFormat = new FormData();

    dataFormat.append("file", file, file.name)

    return this.http.post(`${this.apiUrl}/upload`, dataFormat, {
      responseType: "json",
      reportProgress: true
    });
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/files`)
  }
}
