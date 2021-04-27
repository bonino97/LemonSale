import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PaginationModule } from 'ngx-bootstrap';

import { PaginationComponent } from 'src/app/shared/modules/pagination/components/pagination/pagination.component';
import { UtilsService } from 'src/app/shared/services/utils.service';

@NgModule({
  declarations: [PaginationComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    PaginationModule.forRoot(),
  ],
  exports: [PaginationComponent],
  providers: [UtilsService],
})
export class SharedPaginationModule {}
