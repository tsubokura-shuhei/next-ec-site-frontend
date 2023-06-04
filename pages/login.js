import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Link from "next/link";
import { login, registerUser } from "../lib/auth";
import { useState, useContext } from "react";
import AppContext from "../context/AppContext";

const Login = () => {
  const appContext = useContext(AppContext);
  const [data, setData] = useState({ identifier: "", password: "" });

  console.log(data);

  const handleLogin = () => {
    login(data.identifier, data.password)
      .then((res) => {
        appContext.setUser(res.data.user);
        console.log(res.data.user);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className="paper">
            <div className="header">
              <h2>ログイン画面</h2>
            </div>
          </div>

          <section className="wrapper">
            <Form>
              <fieldset>
                <FormGroup>
                  <Label>メールアドレス:</Label>
                  <Input
                    type="email"
                    name="identifier"
                    style={{ height: 50, fontSize: "1.2rem" }}
                    onChange={(e) => handleChange(e)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>パスワード:</Label>
                  <Input
                    type="password"
                    name="password"
                    style={{ height: 50, fontSize: "1.2rem" }}
                    onChange={(e) => handleChange(e)}
                  />
                </FormGroup>
                <span>
                  <Link href="/">
                    <a>
                      <small>パスワードをお忘れですか?</small>
                    </a>
                  </Link>
                </span>
                <Button
                  style={{ float: "right", width: 120 }}
                  color="primary"
                  onClick={() => {
                    handleLogin();
                  }}
                >
                  ログイン
                </Button>
              </fieldset>
            </Form>
          </section>
        </Col>
      </Row>
      <style jsx>
        {`
          .paper {
            text-align: center;
            margin-top: 50px;
          }
          .header {
            width: 100%;
            margin-bottom: 30px;
          }
          .wapper {
            padding: 10px 30px 20px 30px;
          }
        `}
      </style>
    </Container>
  );
};

export default Login;
