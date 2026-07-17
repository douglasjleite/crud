import type { Category } from "../models/Category.js";
import { DomainError } from "../errors/DomainError.js";

export class CategoryManager {
  private categories: Category[] = [];
  private nextCategoryId: number = 1;
  private productManager: any;

  public setProductManager(pm: any) {
    this.productManager = pm;
  }

  public getCategories(): Category[] {
    return [...this.categories];
  }

  public addCategory(name: string): void {
    const nameExists = this.categories.some(c => c.name === name);
    if (nameExists) throw new Error("Category already exists");

    const newCategory: Category = {
      id: this.nextCategoryId,
      name: name
    }
    this.categories.push(newCategory);
    this.nextCategoryId++;
  }

  public updateCategory(currentName: string, newName: string): void {
    const category = this.categories.find(c => c.name === currentName);

    if (!category) throw new Error("Category not found");

    const nameAlreadyTaken = this.categories.some(c => c.name === newName && c.name !== currentName)

    if (nameAlreadyTaken) throw new Error("Category name already exists");

    category.name = newName;
  }

  public deleteCategory(id: number): void {
    const categoryExists = this.categories.some(c => c.id === id);
    if (!categoryExists) throw new Error("Category not found");

    const hasProducts = this.productManager.getProducts().some((p: any) => p.categoryId === id);

    if (hasProducts) throw new DomainError("Cannot delete category: it still has active products");

    this.categories = this.categories.filter(c => c.id !== id);
  }
}