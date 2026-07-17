import { CategoryManager } from "./services/CategoryManager.js";
import { ProductManager } from "./services/ProductManager.js";

const categoryManager = new CategoryManager();
const productManager = new ProductManager(categoryManager);

categoryManager.setProductManager(productManager);

try {
  categoryManager.addCategory("Electronics");
  categoryManager.addCategory("peripherals");

  productManager.addProduct("ELET-001", "Notebook", 10, 1);
  productManager.addProduct("ELET-002", "Televisão", 20, 1);
  productManager.addProduct("ELET-003", "Mouse", 50, 1);
  
  console.log("Categories:", categoryManager.getCategories());
  console.log("Products:", productManager.getProducts());
  productManager.deleteProduct("ELET-003");
  console.log("After deleting:", productManager.getProducts());

  categoryManager.deleteCategory(2);
  console.log("Categories:", categoryManager.getCategories());
  
} catch (error: any) {
  console.error("System error:", error.message || error);
}