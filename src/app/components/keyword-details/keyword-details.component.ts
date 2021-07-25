import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { KeywordsService,AlertService,DocumentService } from '@app/services';
import { Keyword,Document } from '@app/data-models';
import { DocumentMapping } from 'src/app/data-models';


@Component({
  selector: 'app-keyword-details',
  templateUrl: './keyword-details.component.html',
  styleUrls: ['./keyword-details.component.scss']
})
export class KeywordDetailsComponent implements OnInit {

  form!: FormGroup;
  id!: number;
  isAddMode!: boolean;
  loading = false;
  submitted = false;
  documents!: Document[];
  keyword: Keyword = new Keyword();

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private keywordsService: KeywordsService,
      private alertService: AlertService,
      private documentService: DocumentService
  ) {}


  ngOnInit() {

      this.id = this.route.snapshot.params['id'];

      this.isAddMode = !this.id;     

      this.form = this.formBuilder.group({        
          name: ['', Validators.required],
          description: ['', Validators.required]          
      });

      this.documentService.getAll()
      .pipe(first())
      .subscribe(documents => this.documents = documents);

      if (!this.isAddMode) {
          this.keywordsService.getById(this.id)
              .pipe(first())
              .subscribe(keyword => {             
                this.form.patchValue(keyword);
                this.keyword = keyword;

                this.keyword.documemtMappings.map
                (
                  x=> {
                  let item2 = this.documents.find(i2 => i2.id === x.documentId);
                  if(item2)
                  item2.isSelected = true;
                }
                );
              }
              );
      }

    

      
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      // reset alerts on submit
      this.alertService.clear();

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      this.loading = true;
      if (this.isAddMode) {
          this.createKeyword();
      } else {
          this.updateKeyword();
      }
  }

  private createKeyword() {

    let keywordToSave = new Keyword();
    keywordToSave = this.form.value;
    keywordToSave.documemtMappings = this.keyword.documemtMappings;   

      this.keywordsService.create(keywordToSave)
          .pipe(first())
          .subscribe(() => {
              this.alertService.success('Keyword added', { keepAfterRouteChange: true });
              this.router.navigate(['../'], { relativeTo: this.route });
          })
          .add(() => this.loading = false);
  }

  private updateKeyword() {

    let keywordToSave = new Keyword();
    keywordToSave = this.form.value;
    keywordToSave.id = this.keyword.id;
    keywordToSave.documemtMappings = this.keyword.documemtMappings;    

    console.log(keywordToSave);

      this.keywordsService.update(this.id, keywordToSave)
          .pipe(first())
          .subscribe(() => {
              this.alertService.success('Keyword updated', { keepAfterRouteChange: true });
              this.router.navigate(['../../'], { relativeTo: this.route });
          })
          .add(() => this.loading = false);
  }

  selectDocument(doc){ 
      doc.isSelected = !doc.isSelected;  
      this.keyword.documemtMappings.push({'documentId':doc.id,'keywordId':this.keyword.id});   
  }

  unselectDocument(doc){
    doc.isSelected = !doc.isSelected;    
    this.keyword.documemtMappings.forEach((element,index)=>{
      if(element.documentId==doc.id) this.keyword.documemtMappings.splice(index,1);
   });   
  }

}
