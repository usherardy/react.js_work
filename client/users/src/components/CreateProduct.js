import {useState, useEffect} from "react";
import Axios from "axios";
import Button from 'react-bootstrap/Button';
import '../App.css';

function CreateProduct()
{
    const [listOfProducts, setListOfProducts] = useState([]);
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3000/getProducts").then((response) => {
      setListOfProducts(response.data);
    });
  }, []);

  const createProduct = () => {
    Axios.post("http://localhost:3000/createProduct", {
      name: name,
      brand: brand,
      price: price,
      category: category,
    }).then((response) => {
      setListOfProducts([
        ...listOfProducts,
        {
          name,
          brand,
          price,
          category,
        },
      ]);
    });
  };

  const deleteProduct = async (name) => {
    try {
      const response = await Axios.delete(`http://localhost:3000/deleteProduct/${name}`);
      const deletedProduct = response.data;
      setListOfProducts(listOfProducts.filter(product => product.name !== name));
    } catch (error) {
      console.error(`Error deleting product ${name}:`, error.message);
    }
  };
  
  const updateProduct = async (name) => {
    try {
      const existingProduct = listOfProducts.find(product => product.name === name);
      const updatedProduct = {
        name: name,
        brand: brand,
        price: price,
        category: category,
      };
      const response = await Axios.put(`http://localhost:3000/updateProduct/${name}`, updatedProduct);
      const updatedProductData = response.data;
      setListOfProducts(listOfProducts.map(product => (product.name === name ? updatedProductData : product)));
    } catch (error) {
      console.error(`Error updating product ${name}:`, error.message);
    }
  };
  

  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="text"
        placeholder="Brand"
        onChange={(event) => setBrand(event.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        onChange={(event) => setPrice(event.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        onChange={(event) => setCategory(event.target.value)}
      />
      <Button onClick={createProduct}>Create Product</Button>

      <div className="userDisplay">
        
        {listOfProducts.map((product) => (  
          <>
          <div style={{ width: '18rem', margin:"15px" }}>
           <h3>Name:{product.name}</h3>
           <h3>Brand: {product.brand}</h3>
           <h3>price: {product.price}</h3>
           <h3>category: {product.category}</h3>
          </div>
        <div>        
        <button onClick={() => deleteProduct(product.name)}>Delete Product </button>
        <button onClick={() => updateProduct(product.name)}>Update Product</button>
        </div>
        </>
        ))}
      </div>
    </div>
  );
}

export default CreateProduct;
