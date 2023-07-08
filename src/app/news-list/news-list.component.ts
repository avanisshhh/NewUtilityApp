import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  list: any
  cardList: any;
  cardCopy: any;
  constructor(private newsService: NewsService) { }
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  ngOnInit(): void {
    this.newsList();
  }


  newsList() {
    this.newsService.getNews().subscribe(data => {
      this.list = data;
      console.log(this.list.articles);
      this.cardList = this.list.articles;
      this.cardCopy = this.cardList;
      //debugger
    })
  }

  selectedDate:any;
  filterDate(date:any){
    
    if(date){
      this.cardList = this.cardList.filter((x:any)=>x.publishedAt==date)
    }else{
      this.cardList = this.cardCopy;  
    }
    console.log(this.cardList)
  }

}
