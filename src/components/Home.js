import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "./styles.css";


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
                <Col key={category.id} style={{padding : "1rem"}}>
                    <Card className="cards" style={{ backgroundImage : `url(${category.image})` }}>
                        <Card.Body>
                            <Link to={`/products/${category.id}`} state={{ name: category.name }}>
                                <Card.Title>{category.name}</Card.Title>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
                ))}
            </Row>
        </Container>
        
    )
}