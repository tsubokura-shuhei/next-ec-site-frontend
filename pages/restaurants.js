import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Row,
  Col,
  Button,
} from "reactstrap";
import Link from "next/link";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import Cart from "../components/Cart";
import { useContext } from "react";
import AppContext from "../context/AppContext";

const GET_RESTAURANT_DISHES = gql`
  query ($id: ID!) {
    restaurant(id: $id) {
      id
      name
      dishes {
        id
        name
        description
        price
        image {
          url
        }
      }
    }
  }
`;

const Restaurants = (props) => {
  const appContext = useContext(AppContext);
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
    variables: { id: router.query.id },
  });

  if (error) return "レストランの読み込みに失敗しました";

  if (loading) return <h1>読み込み中・・・</h1>;

  const { restaurant } = data;
  if (restaurant.dishes.length !== 0) {
    console.log();

    return (
      <>
        <h1>{restaurant.name}</h1>
        <Row>
          {restaurant.dishes.map((dish) => (
            <Col xs="6" sm="4" key={dish.id} style={{ paddign: 0 }}>
              <Card style={{ margin: "0 10px" }}>
                <CardImg
                  src={`${process.env.NEXT_PUBLIC_API_URL}${dish.image.url}`}
                  top={true}
                  style={{ height: "250px" }}
                />
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardTitle>{dish.description}</CardTitle>
                </CardBody>
                <div className="card-footer">
                  <Button
                    outline
                    color="primary"
                    onClick={() => appContext.addItem(dish)}
                  >
                    ＋ カートに入れる
                  </Button>
                </div>
              </Card>
            </Col>
          ))}

          <style jsx>
            {`
              a {
                color: white;
              }
              a:link {
                text-decoration: none;
                color: white;
              }
              a:hover {
                color: white;
              }
              .card-colums {
                column-connt: 3;
              }
            `}
          </style>
          <Col xs="3" style={{ paddign: 0 }}>
            <div>
              <Cart />
            </div>
          </Col>
        </Row>
      </>
    );
  } else {
    return <h1>料理が見つかりませんでした。</h1>;
  }
};

export default Restaurants;
