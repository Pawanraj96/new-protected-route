import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import EditProduct from './EditProduct';

function Products() {
    const [products, setproducts] = useState([]);
    const [showEditProduct, setshowEditProduct] = useState(false);
    const [selectedProduct, setselectedProduct] = useState({
        productName: '',
        productPrice: '',
        productImageURL: '',
        productDescription: ''
    });
    const [modalType, setmodalType] = useState('');
    const [loading, setLoading]= useState(false)


    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        const url = 'https://ty-shop.herokuapp.com/api/products'
        setLoading(true)
        try {
            const response = await axios.get(url)
            console.log(response);
            console.log(response.data);
            setproducts(response.data.products)
            setLoading(false)
        } catch (err) {
            console.log(err);
        }
    }

    const deleteProduct = async (productId) => {
        console.log(productId);
        const url = `https://ty-shop.herokuapp.com/api/products/${productId}`
        try {
            const response = await axios.delete(url)
            console.log(response.data);
            /*  const productsCopy = [...products]
             const filteredProducts = productsCopy.filter((prod) => {
                 return prod._id !== productId
             })
             setproducts(filteredProducts) */
            // OR
            fetchProducts()
           
        } catch (err) {
            console.log(err);
        }
    }
    const editProduct = (selectedModalType, prod) => {
        setmodalType(selectedModalType)
        if (selectedModalType === 'edit') {
            setselectedProduct(prod)
        } else {
            setselectedProduct({
                productName: '',
                productPrice: '',
                productImageURL: '',
                productDescription: ''
            })
        }
        setshowEditProduct(true)
    }
    return <div>
               
{loading?<p>loading</p>:
        <Table striped bordered hover>
            <thead>
                <tr><th>Length</th>
                    <th>Id</th>
                    <th>Product Name</th>
                    <th>Product Price</th>
                    <th>Image</th>
                    <th>Description</th>
                    <th><button className='btn btn-primary'
                        onClick={() => { editProduct('add') }}>Add</button></th>
                </tr>
            </thead>
            <tbody>
                {products.length > 0 ? products.map((product, index) => {
                    return <tr key={product._id}>
                        <td>{products.length}</td>
                        <td>{product._id}</td>
                        <td>{product.productName}</td>
                        <td>{product.productPrice}</td>
                        <td><img style={{
                            width: '50px',
                            height: '50px'
                        }} src={product.productImageURL} /></td>
                        <td>{product.productDescription}</td>
                        <td>
                            <button className="btn btn-primary"
                                onClick={() => {
                                    editProduct('edit', product)
                                }}>
                                Edit
                            </button>
                        </td>
                        <td><button className='btn btn-danger'
                            onClick={() => {
                                deleteProduct(product._id)
                            }}>Delete</button></td>
                    </tr>
                }) : <p>no records</p>}
            </tbody>
        </Table>}

        <EditProduct
            modalType={modalType}
            showEditProduct={showEditProduct}
            setshowEditProduct={setshowEditProduct}
            selectedProduct={selectedProduct}
            fetchProducts={fetchProducts} />
    </div>;
}

export default Products;
