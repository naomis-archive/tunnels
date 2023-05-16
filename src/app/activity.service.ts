import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Status } from "./interfaces/Status";

@Injectable({
  providedIn: "root",
})
export class ActivityService {
  public cache = new Map<string, Status>();
  constructor(private http: HttpClient) {}

  public getData(URL: string): Observable<Status> {
    const cached = this.cache.get(URL);
    if (cached) {
      return of(cached);
    }
    const response = this.http.get<Status>(URL);
    response.subscribe((data) => {
      this.cache.set(URL, data);
    });
    return response;
  }

  public clearCache(): void {
    this.cache = new Map();
  }
}
