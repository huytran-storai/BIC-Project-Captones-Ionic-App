import { Injectable } from '@angular/core';
import { News } from './../shared/models/News';
import { sample_news } from 'src/data';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor() { }
  getAll(): News[] {
    return sample_news
  }
}
