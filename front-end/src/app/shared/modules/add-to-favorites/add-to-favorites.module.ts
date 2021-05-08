import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { AddToFavoritesComponent } from 'src/app/shared/modules/add-to-favorites/components/add-to-favorites/add-to-favorites.component';
import { AddToFavoritesService } from 'src/app/shared/modules/add-to-favorites/services/add-to-favorites.service';
import { AddToFavoritesEffect } from 'src/app/shared/modules/add-to-favorites/store/effects/add-to-favorites.effect';

@NgModule({
  declarations: [AddToFavoritesComponent],
  imports: [CommonModule, EffectsModule.forFeature([AddToFavoritesEffect])],
  exports: [AddToFavoritesComponent],
  providers: [AddToFavoritesService],
})
export class AddToFavoritesModule {}
