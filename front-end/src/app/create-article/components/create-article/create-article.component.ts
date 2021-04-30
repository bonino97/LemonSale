import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
})
export class CreateArticleComponent implements OnInit {
  initialValues = {
    title: 'John Doe',
    description: 'John Doe is a fake person',
    body: 'John Doe is a fake person who want to make this things easier.',
    tagList: ['1', '2', '3'],
  };

  constructor() {}

  ngOnInit(): void {}

  onSubmit(res: any): void {
    console.log('res', res);
  }
}
