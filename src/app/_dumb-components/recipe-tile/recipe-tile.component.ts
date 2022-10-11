import { Component, Input, OnInit } from '@angular/core';
import { apiModel } from '../../../models/api.model';

@Component({
  selector: 'app-recipe-tile',
  templateUrl: './recipe-tile.component.html',
  styleUrls: ['./recipe-tile.component.scss'],
})
export class RecipeTileComponent implements OnInit {
  @Input() recipe!: apiModel.recipe;

  constructor() {}

  ngOnInit(): void {}
}
