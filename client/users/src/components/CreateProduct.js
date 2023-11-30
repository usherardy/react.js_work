import {useState, useEffect} from "react";
import Axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../App.css';
import Dropdown from 'react-bootstrap/Dropdown';

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
            
          <Card style={{ width: '18rem', margin:"15px" }}>
          <Card.Body>
            <Card.Title>Name:{product.name}</Card.Title>
            <Card.Text>
              Brand: {product.brand}<br/>
              price: {product.price}<br/>
              category: {product.category}<br/>
            </Card.Text>
           
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                More Options
              </Dropdown.Toggle>
    
              <Dropdown.Menu>
                <Dropdown.Item > <Button variant="secondary"onClick={() => deleteProduct(product.name)}  >Delete user</Button></Dropdown.Item>
                <Dropdown.Item><Button variant="secondary" onClick={() => updateProduct(product.name)}>Update user</Button></Dropdown.Item>
        
              </Dropdown.Menu>
            </Dropdown>
            
          </Card.Body>
        </Card>
        
        ))}
      </div>
    </div>
  );
}

export default CreateProduct;
