import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { KeywordsService } from '@app/services';
import { Keyword } from '@app/data-models';


@Component({
  selector: 'app-keyword-list',
  templateUrl: './keyword-list.component.html' 
})


export class KeywordListComponent implements OnInit {
    keywords!: Keyword[];  
    searchText:string="";

  constructor(private keywordService: KeywordsService) { }

  ngOnInit(): void {
    this.keywordService.getAll()
    .pipe(first())
    .subscribe(keywords => this.keywords = keywords);
  }

  deleteKeyword(id: number) {
    const keyword = this.keywords.find(x => x.id === id);
    if (!keyword) return;
    keyword.isDeleting = true;
    this.keywordService.delete(id)
        .pipe(first())
        .subscribe(() => this.keywords = this.keywords.filter(x => x.id !== id));
}

searchKeyword() {
  this.keywordService.searchByName(this.searchText)
    .pipe(first())
    .subscribe(keywords => this.keywords = keywords);
}
}
