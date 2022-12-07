import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  apiUrl = "https://file.io";

  constructor(private http:HttpClient) { }

  upload(file: any): Observable<any> {

    const dataFormat = new FormData();

    dataFormat.append("file", file, file.name)

    return this.http.post(this.apiUrl, dataFormat)
  }
}
