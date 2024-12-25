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
    const categoryExists = currentCategories.some(cat => cat.name.toLowerCase() === category.name.toLowerCase());
    if (categoryExists) {
      throw new Error('Category name must be unique.');
    }
    this.categoriesSource.next([...currentCategories, category]);
  }

  updateCategory(categoryToUpdate: { name: string }, newCategoryName: string) {
    const currentCategories = this.categoriesSource.value;
    //category name must be unique
    const categoryExists = currentCategories.some(
      (cat) => cat.name.toLowerCase() === newCategoryName.toLowerCase() && cat.name !== categoryToUpdate.name
    );

    if (categoryExists) {
      throw new Error('Category name must be unique.');
    }

    const categoryIndex = currentCategories.findIndex(cat => cat.name === categoryToUpdate.name);

    if (categoryIndex !== -1) {
      currentCategories[categoryIndex] = { name: newCategoryName };
      // Emit the updated list
      this.categoriesSource.next([...currentCategories]);
    }
  }

  deleteCategory(categoryToDelete: { name: string }) {
    const currentCategories = this.categoriesSource.value;
    // Filter out the category to delete
    const updatedCategories = currentCategories.filter(cat => cat.name !== categoryToDelete.name);
    // Emit the updated list
    this.categoriesSource.next(updatedCategories);
  }
}
