import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
  private readonly serverUrl = "http://localhost:8081";
  constructor(private http: HttpClient) { }

  public ProcessReqest(url: string): Observable<any> {
    const model = {
      "webUrl": url
    }

    return this.http.post(`${this.serverUrl}/api/v1/getUrlInformation`, model)
  }
}
