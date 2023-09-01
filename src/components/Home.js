import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from 'react-bootstrap';


export default function Home(){
    const [categories, setCategories] = useState([]);

    const getCategories = async() =>{
        const data = await fetch("https://api.escuelajs.co/api/v1/categories");
        setCategories(await data.json());
    }

    useEffect(()=>{
        getCategories();
    },[])
    return(
        <Container>
            <h1>Shopping App</h1>
            <Row>
                {categories.map((category) => (
                <Col key={category.id} xs={12} sm={6} md={4} lg={3}>
                    <Card style={{ backgroundImage: `url(${category.image})`, backgroundSize: 'cover' }}>
                    <Card.Body>
                        <Card.Title>{category.name}</Card.Title>
                    </Card.Body>
                    </Card>
                </Col>
                ))}
            </Row>
        </Container>
        
    )
}