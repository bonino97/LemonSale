import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticleFormComponent } from 'src/app/shared/modules/article-form/components/article-form/article-form.component';
import { BackendErrorMessagesModule } from '../backend-error-messages/backend-error-messages.module';

@NgModule({
  declarations: [ArticleFormComponent],
  imports: [CommonModule, ReactiveFormsModule, BackendErrorMessagesModule],
  exports: [ArticleFormComponent],
})
export class ArticleFormModule {}
