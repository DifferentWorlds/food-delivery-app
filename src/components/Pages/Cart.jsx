import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';

const Cart = ({cartItems, placeOrder, order}) => {
const cartCountMap = cartItems && cartItems.reduce((acc, name) => {
  acc[name] = (acc[name] || 0) + 1;
  return acc;
}, {});
    
    return(
        <>
{cartItems.length > 0 ? ([...new Set(cartItems)].map((item, index) => (
        <Container>
      <Row key={index} className='items-row'>
        <Col sm={8}>{item}</Col>
        <Col sm={4}>x {cartCountMap[item]}</Col>
      </Row>
      </Container>

))) : <p className='no-cart-items'>add items to show here!</p>}
{cartItems.length > 0 && <Button variant="warning" onClick={placeOrder}>Place Order</Button>}
{order && <div className='top-notification'>your order has been placed!</div>}
</>
    )}

export default Cart;