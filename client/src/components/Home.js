import React, {useState} from "react";
import Navbar from "./Nav";
import { Form, Button, Row, Col } from "react-bootstrap";

export default function Home() {



  const [nbrUrl, setNbrUrl] =useState(0)
  const [long_url, setLongUrl] = useState('')
  const [short_url, setShortUrl] = useState('')

  const handleClick = (e) => {

    e.preventDefault()

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ url: 'https://www.npmjs.com/package/http-request' })
  };

    /*axios.post('http://localhost:8000/getUrl', { url: "https://www.npmjs.com/package/http-request"}, { headers: headers})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error)
      });*/

      try{

        if(long_url === '') { 
          alert('Url must not be empty') 
          throw new Error('Url must not be empty')
        }

        fetch('http://localhost:8000/getUrl', requestOptions)
        .then(response => response.json())
        .then(data => {
          setNbrUrl(data.nbr)
          setShortUrl(data.url_result)
        })
        .catch((error) => {console.log(error)})

      }catch(err){
        console.log(err)
      }

      
        
  }

  const handleChange = (e) => {
        setLongUrl(e.target.value)
  }

  return (
    <React.Fragment>
      <Navbar /><br/><br/>
      <Row className="bg-black py-5 justify-content-center">
          <Col sm={8} md={6} lg={6}>
      <Form>
        <Form.Group controlId="formBasicEmail">

          <Form.Label>Your URL</Form.Label>
          <Form.Control onChange={handleChange} value={long_url} type="text" placeholder="Enter the url and send" />

          <Form.Text className="text-muted">
            More than <b><span style={{color:"green"}}>{nbrUrl === 0 ? '' : nbrUrl} </span></b> URL's have been shrotened by this application
          </Form.Text>

        </Form.Group>
        <Button onClick={handleClick} variant="secondary" type="submit">
          Shorten
        </Button> <br/><br/>
        {short_url === '' ? '': 'The shortened URL is '+  short_url  }
      </Form>
      </Col>
      </Row>
    </React.Fragment>
  );
}
