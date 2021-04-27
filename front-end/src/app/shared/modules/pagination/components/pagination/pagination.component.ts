import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { stringify, parseUrl } from 'query-string';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input('total') totalProps: number;
  @Input('limit') limitProps: number;
  @Input('currentPage') currentPageProps: number;
  @Input('url') urlProps: string;

  maxSize: number = 4;
  boundaryLinks: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  pageChanged(event): void {
    const stringifiedParams = stringify({
      page: event.page,
    });
    const pageUrl = `?${stringifiedParams}`;
    this.router.navigateByUrl(pageUrl);
  }
}
