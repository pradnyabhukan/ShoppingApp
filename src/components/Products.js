import { useLocation, useParams } from "react-router-dom"
import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button, Dropdown, InputGroup, Form } from 'react-bootstrap';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [searchVal, setSearchVal] = useState("");
    const id = useParams();
    const url = `https://api.escuelajs.co/api/v1/categories/${id.id}/products`
    const getProducts = async() =>{
        const data = await fetch(url);
        const productsData = await data.json();
        setProducts(productsData);
        
    }
    const getSortedProducts = (e) =>{
        const id = e.currentTarget.getAttribute("id");
        console.log("called!", id)
        let sortedData = []
        if(id == 1){
            sortedData = ([...products].sort((a,b) => a.price - b.price));
        }else if(id == 2){
            sortedData = ([...products].sort((a,b) => b.price - a.price));
        }
        setProducts(sortedData);
    }

    const handleSearchSubmit = async() =>{
        console.log("submit clicked")
        console.log(searchVal);
        const url = `https://api.escuelajs.co/api/v1/products/?title=${searchVal}&categoryId=${id.id}`;
        const data = await fetch(url);
        const filterData = await data.json();
        setProducts(filterData);
    }
    useEffect(()=>{
        getProducts();
        
    },[]);

    console.log(products);    
    return(
        <Container>
            <Row style={{padding: "2rem"}}>
                <Col>
                    <h1>{products[0]?.category?.name}</h1>
                </Col>
                <Col>
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Search"
                        onChange={(e)=>{setSearchVal(e.target.value)}}
                    />
                    <Button variant="outline-secondary" id="button-addon2" onClick={handleSearchSubmit}>
                        Search
                    </Button>
                </InputGroup>
                </Col>
                <Col>
                <Dropdown>
                    <Dropdown.Toggle varient="success" id="dropdown-basic">
                        Sort 
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={getSortedProducts} id="1">Low to High</Dropdown.Item>
                        <Dropdown.Item onClick={getSortedProducts} id="2">High to Low</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                </Col>
            </Row>
            
            <Row>
                {products?.map((product) => (
                    <Col key={product?.id} style={{padding : "1rem"}}>
                        <Card className="product-cards">
                            <Card.Img src={product?.images[0]}></Card.Img>
                            <Card.Body style={{overflowY : "hidden"}}>
                                    <Card.Title>{product?.title}</Card.Title>
                                    <Card.Text >{product?.description}</Card.Text>
                                    <Row>
                                        <Col><Card.Text>${product?.price}</Card.Text></Col>
                                        <Col><Button>Add item</Button></Col>    
                                    </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                )
        
                )}
            </Row>
        </Container>

    ) 
}