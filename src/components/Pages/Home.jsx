import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

const Home = ({addToCart, removeFromCart}) => {
  
  const [data, setData] = useState();
  console.log(data, 'data');
  

  useEffect(() => {
    fetch("https://dummyjson.com/recipes")
      .then((res) => res.json())
      .then((res) => setData(res.recipes));
  }, []);
  
  return (
    <div className="card-container">
      {data &&
        data.map((card) => (
          <Card key={card.id} className="food-card" style={{ width: "18rem" }}>
            <Card.Img variant="top" src={card.image} />
            <Card.Body>
              <Card.Title>{card.name}</Card.Title>
              <div className="rating">
                ${card.prepTimeMinutes}
                <FontAwesomeIcon icon={faStar} />
                <Card.Text>
                  {card.rating}({card.reviewCount})
                </Card.Text>
              </div>
              <div className="cart-button-container">
                {Number(sessionStorage.getItem(`cartCount${card.id}`)) > 0 && (
                    <>
                  <Button onClick={() => removeFromCart(card.id, card.name)} variant="outline-warning" >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                  <p className="para-style">
                    {Number(sessionStorage.getItem(`cartCount${card.id}`))}
                  </p>
                  </>
                )}
                
                <Button onClick={() => addToCart(card.id, card.name)} variant="outline-warning">
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
    </div>
  );
};

export default Home;
