import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { Card } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
})
export class NewsListComponent implements OnInit {
  list: any;
  cardDate: any;
  fromDate: any;
  toDate: any;
  cardList: Card[] = [];
  filteredCards: Card[] = [];
  publishedDate: any;
  countries: string[] = ['USA', 'Canada', 'UK', 'India'];
  Date1: any;
  Date2: any;
  filter = {
    fromDate: '',
    toDate: '',
  };
  constructor(private newsService: NewsService, private route: Router) { }
  ngOnInit(): void {
    this.newsList();
  }
  //method to get cards from api service
  newsList() {
    this.newsService.getNews().subscribe((data) => {
      this.list = data;
      //console.log(this.list.articles);
      this.cardList = this.list.articles;

      this.filteredCards = this.list.articles;
      console.log(this.filteredCards);
    });
  }
  //Date conversion ISO
  convertDateFormat(dateString: string): string {
    const date = new Date(dateString);
    const isoDateString = date.toISOString();
    return isoDateString;
  }
  //date filter to filter cards
  applyFilters() {
    if (this.filter.fromDate && this.filter.toDate) {
      this.Date1 = new Date(this.filter.fromDate);
      this.Date2 = new Date(this.filter.toDate);  
      this.fromDate = this.convertDateFormat(this.Date1);
      this.toDate = this.convertDateFormat(this.Date2);
      this.filteredCards = this.cardList.filter((cards: Card) => {
        const cardDate = cards.publishedAt;
        return cardDate >= this.fromDate && cardDate <= this.toDate;
      });
      console.log(this.filteredCards, 'new filtered cards');
      // return this.filteredCards;   
    } else {
      this.filteredCards = this.list.articles;
      console.log(this.filteredCards, 'new filtered cards');
    }
  }
  //search method to search for a cards
  searchCards() {
    const searchInput = document.getElementById(
      'searchInput'
    ) as HTMLInputElement;
    const searchTerm = searchInput.value.toLowerCase();

    if (searchTerm.length == 0) {
      this.newsList();
    }
    this.filteredCards = this.filteredCards.filter((card) =>
      card.title.toLowerCase().includes(searchTerm)
    );
    console.log(this.filteredCards, 'check after search');

    if (this.filteredCards.length == 0) {
      this.filteredCards = this.cardList;
      console.log(this.filteredCards);
    }
    return this.filteredCards;
  }
}
