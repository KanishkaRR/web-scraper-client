import { Component, Input, OnInit } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { AnalysisService } from 'src/app/services/analysis.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public url = new FormControl()
  constructor(private analyse: AnalysisService, public activeModal: NgbActiveModal) { }
  @Input()
  public item: any = {};
  public headings: any = {};
  ngOnInit(): void {
    this.item.url = ""
    this.item.pageVersion = ""
    this.item.title = ""
    this.item.internalLinkCount = 0
    this.item.externalLinkCount = 0
    this.item.activeLinkCount = 0
    this.item.hasLoginForm = ""
    this.item.headings = [];
  }

  onSubmit() {
    this.analyse.ProcessReqest(this.url.value).pipe(catchError(this.Errorhandleer)).subscribe(res => {
      console.log(res)
      this.item.url = res.Url
      this.item.pageVersion = res.PageVersion
      this.item.title = res.Title
      this.item.internalLinkCount = res.LinkDetails.Internal
      this.item.linkCount = res.LinkDetails.NoofLinks
      this.item.activeLinkCount = res.LinkDetails.Active
      this.item.hasLoginForm = res.HasLoginForm
      this.item.headings = res.Headings;
    })
  }

  private Errorhandleer(exception: HttpErrorResponse) {
    if (exception.status === 0) {
      console.error('An error occurred:', exception.error);
    } else {
      console.error(
        `Backend returned code ${exception.status}, body was: `, exception.error);
    }
    return throwError(() => new Error('Bad request'));
  }
}

