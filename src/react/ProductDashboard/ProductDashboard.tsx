
import React, { useState, useEffect } from "react";
 
interface Product {
  id: string | number;
  name: string;
  price: number;
  description?: string;
}
 
function ProductDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<"name" | "price">("name");
 
  useEffect(() => {
    // Simulating API call
    setLoading(true);
    fetch('https://api.example.com/products')
      .then(response => response.json())
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);
 
  const filteredProducts = products
    .filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "price") {
        return a.price - b.price;
      }
      return 0;
    });
 
  return (
    <div className="product-dashboard">
      <h1>Product Dashboard</h1>
     
      <div className="controls">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
        />
       
        <select
          value={sortBy}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSortBy(e.target.value as "name" | "price")
          }
        >
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
        </select>
      </div>
     
      {loading && <p>Loading products...</p>}
      {error && <p className="error">{error}</p>}
     
      <ul className="product-list">
        {filteredProducts.map(product => (
          <li key={product.id} className="product-item">
            <h3>{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>
            {product.description && <p>{product.description}</p>}
            <button onClick={() => alert(`Added ${product.name} to cart!`)}>
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
 
export default ProductDashboard;