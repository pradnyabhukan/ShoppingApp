import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CartContext } from "../App";

export default function Cart(){
    const {cart, setCart} = useContext(CartContext);
    const [price, setPrice] = useState(0);
    const handleQty = (item, e) =>{
        const action = e.currentTarget.getAttribute("id");
        let changeItem = cart.map((product)=>{
            if(item.product === product.product){
                if(action === "add"){
                    return { ...product, qty: product.qty + 1}
                }else if(action === "sub"){
                    return { ...product, qty: product.qty - 1}
                }
            }else{
                return product;
            }
        });
        setCart(changeItem);
    }

    const handlePrice = () =>{
        let total = 0;
        cart.forEach(element => {
            total +=( element.product.price * element.qty);
        });
        setPrice(total);
    }

    const handleDelete = (index) =>{
        console.log(cart, " ", index)
        const temp = [...cart];
        temp.splice(index,1);
        setCart(temp);
    }

    useEffect(()=>{
        handlePrice();
    },[cart])
    return(
        <Container>
            <Row>
                <Col><h1>Cart</h1></Col>
                <Col>
                    <Link to="/">Home</Link>
                </Col>
            </Row>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart?.map((item, i)=>{
                            return(
                                <tr>
                                    <td>{i+1}</td>
                                    <td>{item.product.title}</td>
                                    <td>${item.product.price}</td>
                                    <td>
                                        <Button variant="outline-primary" id="add" onClick={(e)=>handleQty(item,e)}>+</Button>
                                        {item.qty}
                                        <Button id="sub" variant="outline-primary" disabled={item.qty === 0} onClick={(e)=>handleQty(item,e)}>-</Button>
                                    </td>
                                    <td>
                                        <Button onClick={()=>{handleDelete(i)}}>Delete</Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>

                <p>Total Price: ${price}</p>
        </Container>
    )
}