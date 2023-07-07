import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  list:any
cardList:any;
  constructor(private newsService:NewsService) { }
  ngOnInit(): void {
    this.newsList();
  }


  newsList(){
    this.newsService.getNews().subscribe(data=>{
      this.list=data;
      console.log(this.list.articles);
      this.cardList=this.list.articles;
      //debugger
      
      
    })

  }

}
