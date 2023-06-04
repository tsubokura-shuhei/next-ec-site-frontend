import { Card, CardBody, CardImg, CardTitle, Row, Col } from "reactstrap";
import Link from "next/link";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const query = gql`
  {
    restaurants {
      id
      name
      description
      image {
        url
      }
    }
  }
`;

const RestaurantList = (props) => {
  const { loading, error, data } = useQuery(query);

  if (error) return "レストランの読み込みに失敗しました";

  if (loading) return <h1>読み込み中・・・</h1>;

  if (data?.restaurants && data?.restaurants.length) {
    // ▼検索した文字をデータと比較してfilterで絞り込む▼
    const searchQuery = data.restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(props.search)
    );
    // ▲検索した文字をデータと比較してfilterで絞り込む▲
    return (
      <Row>
        {searchQuery.length === 0 ? (
          <>
            <h1>お探しの店舗が見つかりません。</h1>
          </>
        ) : (
          <>
            {searchQuery.map((res) => (
              <Col xs="6" sm="4" key={res.id}>
                <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
                  <CardImg
                    src={`${process.env.NEXT_PUBLIC_API_URL}${res.image[0].url}`}
                    top={true}
                    style={{ height: "250px" }}
                  />
                  <CardBody>
                    <CardTitle>{res.name}</CardTitle>
                    <CardTitle>{res.description}</CardTitle>
                  </CardBody>
                  <div className="card-footer">
                    <Link
                      href={`/restaurants?id=${res.id}`}
                      as={`/restaurants/${res.id}`}
                    >
                      <a className="btn btn-primary">もっと見る</a>
                    </Link>
                  </div>
                </Card>
              </Col>
            ))}
          </>
        )}

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
      </Row>
    );
  } else {
    return <h1>レストランが見つかりませんでした。</h1>;
  }
};

export default RestaurantList;
