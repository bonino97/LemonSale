import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/shared/services/utils.service';

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

  pagesCount: number;
  pages: number[];

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log(this.totalProps);
  }

  pageChanged(event): void {
    this.router.navigateByUrl(`?page=${event.page}`);
  }
}
