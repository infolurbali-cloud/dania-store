import './App.css'
import { products } from "./data/products.js";
console.log(products)
for (const product of products) {
  console.log(product.price);
}
function hasStock(product) {
  return product.stock > 0;
}

const hasStockArrow = (product) => product.stock > 0;

console.log(hasStock(products[0])); // true
console.log(hasStockArrow(products[1])); // false
const productTitles = products.map((product) => product.title);
console.log(productTitles);
const { title, price,stock } = products[0];

console.log(stock,title,price,); 

const [firstProduct, secondProduct] = products;
console.log(firstProduct.title); 
console.log(secondProduct.title); 

const updatedProduct = { ...products[0], stock: 10 };

console.log(updatedProduct.stock); 
console.log(products[0].stock); 
const newProduct = {
  id: 5,
  title: "Buku Catatan",
  price: 30000,
  stock: 6,
};

const expandedProducts = [...products, newProduct];

console.log(expandedProducts.length); 
console.log(products.length); 

function App() {
  const availableProducts = products.filter((product) => product.stock > 0);

  return (
    <section id="center" style={{ alignItems: 'stretch', maxWidth: '800px', margin: '0 auto', padding: '32px 20px', textAlign: 'left' }}>
      <div>
         <h1>Produk yang Tersedia</h1>
      <p>
        {availableProducts.length} dari {products.length} produk siap ditampilkan.
      </p>

      <ul>
        {availableProducts.map((product) => (
          <li key={product.id}>
            {product.title} — Rp {product.price} — Stok: {product.stock}
          </li>
        ))}
      </ul>
      </div>
    </section>
  )
}

export default App
