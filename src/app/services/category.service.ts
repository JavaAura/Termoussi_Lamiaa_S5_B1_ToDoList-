import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
private categoriesSource = new BehaviorSubject<{ name: string }[]>([]);
  categories$ = this.categoriesSource.asObservable();

  addCategory(category: { name: string }) {
    const currentCategories = this.categoriesSource.value;
    this.categoriesSource.next([...currentCategories, category]);
  }
}
