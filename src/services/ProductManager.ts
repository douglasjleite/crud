import type { Product } from "../models/Product.js";
import { CategoryManager } from "./CategoryManager.js";

export class ProductManager {
  private products: Product[] = [];
  private nextProductID: number = 1;
  private categoryManager: CategoryManager;

  constructor(categoryManager: CategoryManager) {
    this.categoryManager = categoryManager;
  }

  public getProducts(): Product[] {
    return [...this.products];
  }

  public addProduct(sku: string, name: string, quantity: number, categoryId: number): void {
    const categoryExists = this.categoryManager.getCategories().some(c => c.id === categoryId);
    const skuAlreadyExists = this.products.some(p => p.sku === sku);

    if (!categoryExists) throw new Error("Category not found")
    if (skuAlreadyExists) throw new Error("SKU already exists");

    const newProduct = {
      id: this.nextProductID,
      sku: sku,
      name: name,
      quantity: quantity,
      categoryId: categoryId
    }
    this.products.push(newProduct);
    this.nextProductID++;
  }

  public updateProduct(sku: string, newQuantity: number, updateName: string): void {
    const product = this.products.find(p => p.sku === sku);
    const nameExists = this.products.some(p => p.name === updateName && p.sku !== sku);

    if (!product) throw new Error("Product not found");
    if (nameExists) throw new Error("This name is already used by another product")
    if (newQuantity < 0) throw new Error("Invalid quantity");

    product.quantity = newQuantity;
    product.name = updateName;
  }

  public deleteProduct(sku: string): void {
    const productExists = this.products.some(p => p.sku === sku);
    
    if (!productExists) throw new Error("Product not found");

    this.products = this.products.filter(p => p.sku !== sku);
  }
}
