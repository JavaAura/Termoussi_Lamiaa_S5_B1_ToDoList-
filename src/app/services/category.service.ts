import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
private categoriesSource = new BehaviorSubject<{ name: string }[]>([]);
  categories$ = this.categoriesSource.asObservable();
  constructor() { }

  addCategory(category: { name: string }) {
    const currentCategories = this.categoriesSource.value;
    this.categoriesSource.next([...currentCategories, category]);
  }

  updateCategory(categoryToUpdate: { name: string }, newCategoryName: string) {
    const currentCategories = this.categoriesSource.value;
    const categoryIndex = currentCategories.findIndex(cat => cat.name === categoryToUpdate.name);

    if (categoryIndex !== -1) {
      currentCategories[categoryIndex] = { name: newCategoryName };
      // Emit the updated list
      this.categoriesSource.next([...currentCategories]);
    }
  }
}
