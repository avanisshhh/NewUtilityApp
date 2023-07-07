import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private httpClient: HttpClient) { }
  getNews(){
    return this.httpClient.get("https://newsapi.org/v2/everything?domains=wsj.com&apiKey=b312a1a0a9314c97a45b8a9d2fbe6752");
  }
}
