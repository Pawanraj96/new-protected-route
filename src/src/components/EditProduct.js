import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function EditProduct(props) {
    const [show, setShow] = useState(false);
    const [product, setproduct] = useState({
        _id: '',
        productName: '',
        productPrice: '',
        productImageURL: '',
        productDescription: ''
    });

    useEffect(() => {
        setShow(props.showEditProduct)
    }, [props.showEditProduct])
    
    useEffect(() => {
        setproduct(props.selectedProduct)
    }, [props.selectedProduct])

    const handleClose = () => {
        setShow(false)
        props.setshowEditProduct(false)
    };

    const handleChange = (event) => {
        const productCopy = { ...product }
        productCopy[event.target.name] = event.target.value
        setproduct(productCopy)
    }
    const editProduct = async () => {
        console.log(product);
        let url = ''
        const editUrl = `https://ty-shop.herokuapp.com/api/products/${product._id}`
        const addUrl = 'https://ty-shop.herokuapp.com/api/products'
        try {
            if (props.modalType === 'add') {
                url = addUrl
                const response = await axios.post(url, product)
                console.log(response.data);
                if (response.data.error === false) {
                    handleClose()
                    props.fetchProducts()
                } else {
                    alert(response.data.message)
                }
            } else if (props.modalType === 'edit') {
                url = editUrl
                const response = await axios.put(url, product)
                console.log(response.data);
                if (response.data.error === false) {
                    handleClose()
                    props.fetchProducts()
                } else {
                    alert(response.data.message)
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
    // Fragment
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> {props.modalType === 'edit' ? 'Edit Product' : 'Add Product'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className="row">
                            <div className="col">
                                <input type="text"
                                    name="productName"
                                    value={product.productName}
                                    onChange={(event) => { handleChange(event) }}
                                    className="form-control" placeholder="Product Name" />
                            </div>
                            <div className="col">
                                <input type="number"
                                    name="productPrice"
                                    value={product.productPrice}
                                    onChange={handleChange}
                                    className="form-control" placeholder="Product Price" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <input type="text"
                                    name="productImageURL"
                                    value={product.productImageURL}
                                    onChange={handleChange}
                                    className="form-control" placeholder="Product Image" />
                            </div>
                            <div className="col">
                                <input type="text"
                                    name="productDescription"
                                    value={product.productDescription}
                                    onChange={handleChange}
                                    className="form-control" placeholder="Product Description" />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={editProduct}>
                        {props.modalType === 'edit' ? 'Update Changes' : 'Add'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditProduct;
