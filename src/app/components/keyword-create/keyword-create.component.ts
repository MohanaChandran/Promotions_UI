import { Component, OnInit } from '@angular/core';
import {KeywordsService} from 'src/app/services/keywords.service';
import {DocumentService} from 'src/app/services/document.service';
import {Document} from 'src/app/data-models/document';
import {Keyword } from 'src/app/data-models/keyword';

@Component({
  selector: 'app-keyword-create',
  templateUrl: './keyword-create.component.html',
  styleUrls: ['./keyword-create.component.scss']
})
export class KeywordCreateComponent implements OnInit {

  keyword: Keyword;
  document: Document;
  keywordsService: KeywordsService;
  documentService:DocumentService;
  submitted = false;

  constructor(
    private ikeywordsService: KeywordsService,
    private iKeyword: Keyword
    ,private idocumentService: DocumentService
    ,private idocument: Document) 
    { 
      this.keyword = iKeyword;
      this.keywordsService = ikeywordsService;
      this.document = idocument;
      this.documentService = idocumentService;
    }

  ngOnInit(): void {
  }

  createkeyword():void{

    this.keywordsService.create(this.keyword)
    .subscribe(
      response => {
        console.log(response);
        this.submitted = true;
      },
      error =>{
        console.log(error);
        
      }
    );
  }

  
  newKeyword(): void {
    this.submitted = false;
    this.keyword = new Keyword();
}
}