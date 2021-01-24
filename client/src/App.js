import './App.scss';
import React from 'react';
import {
    Button,
    Container,
    Row,
    Navbar,
    Col,
} from 'react-bootstrap';

class App extends React.Component {

    constructor(props) {
        super(props);

        //this.sendPing = this.sendPing.bind(this);
        this.state = {
            ping: 0,
            connected: false,
        }
    }

    componentDidMount() {
        this.ws = new WebSocket('ws://192.168.178.72:3000/');
        this.ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected');
            this.setState({
                connected: true,
            })

            setInterval(() => {
                this.pingStart = new Date().getTime();
                this.ws.send('ping');
            }, 1000);
        }

        this.ws.onmessage = evt => {
            // listen to data sent from the websocket server
            const message = JSON.parse(evt.data)
            this.setState({dataFromServer: message})
            console.log(message);

            switch(message.command) {
                case 'pong':
                    this.setState({
                        ping: (new Date().getTime()) - this.pingStart,
                    })
                break;
            }
        }

        this.ws.onclose = () => {
            console.log('disconnected')
            this.setState({
                connected: false,
            })
        }
    }

    render() {
        let buttonConnected = (this.state.connected) ? "success": "danger";

        return (
            <Container fluid>
                <Row>
                    <Col>
                        <Navbar bg="dark" variant="dark" expand="lg">
                            <Navbar.Brand>My little robot</Navbar.Brand>
                            <Navbar.Toggle />
                            <Navbar.Collapse className="justify-content-end">
                                <Navbar.Text>
                                    <Button variant={buttonConnected}>{this.state.ping}ms</Button>
                                </Navbar.Text>
                            </Navbar.Collapse>
                        </Navbar>
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}><Button onClick={this.sendTest}>Send test message</Button></Col>
                    <Col xs={6}>Middle</Col>
                    <Col xs={3}>Right</Col>
                </Row>
            </Container>
        );
    }
}

export default App;
