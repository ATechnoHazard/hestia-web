import React from 'react';
import profile from '../../assets/profile.png';
import deletez from '../../assets/delete.png';
import { Card, Row, Col } from 'antd';
import Profile from './profile';
import plus from '../../assets/plus.png';
import Nav from '../nav';

class Myreqs extends React.Component{
    constructor(props){
        super(props);
        this.state={
            goto: "myreqs",
            Requests: []
        }
    }
    
    gotoProfile = () => {
        this.setState({
            goto: "profile"
        });
        
    }

    deleterequest = (id) => {
        console.log("nirmit")
        console.log(id)

        



        let newarr = this.state.Requests.filter( request =>{
            return request.id !==id
        })
        this.setState({
            Requests: newarr
        })


    }
    componentDidMount(){
        if(localStorage.getItem("token")){
        //  console.log("someone's logged in")
        }else{
            this.props.history.push("/login");
        }

        fetch('https://hestia-requests.herokuapp.com/app/my_requests/', {
            headers: new Headers({
            'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiJhYmNkZWdoaWprZjEyMzQifQ.GqnmZCcGjtCN_bTznL5LbA_Wdt_BsBN5IpSAHmdDeu8'
            })
            })
            .then(res => res.json())
            .then(data => {
                 console.log(data)
            this.setState({
                Requests: data.Requests
                
            });
            console.log(this.state)
            })
            .catch(error => console.error(error))


     }

    render(){
        if(this.state.goto === "profile"){
            return(
                <Profile />
            );
        }else if(this.state.goto === "myreqs"){


        const { Requests } = this.state;
        
        const reqlist = Requests.length ? (
            Requests.map(
                request =>{
                    return(
                        <Card key={request.id}>
                        <Row>
                            <Col span={17}>
                                <div className="feed-card-header">
                                    <span>
                                    <strong>{request.item_name}</strong>
                                    </span>
                                        <p>{request.quantity}</p>
                                </div>
                                <div className="feed-card-date">
                                        <p>{request.date_time_created.slice(0,10)}</p>
                                </div>
                            </Col>
                            <Col span={7} className="iconz">
                                <div className="imgback">
                                    <img onClick={()=>{this.deleterequest(request.id)}} src={deletez} alt="location"></img>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                    )
                }
            )
        ) : (
            <div>You have not made any request</div>
        )
            return(
            <div className="myreqs">
                <div className="main-title">    
                <Row>
                    <Col span={18}>
                        <h1>My Requests</h1>
                    </Col>
                    <Col span={6}>
                    <img onClick={this.gotoProfile} src={profile} alt="Profile logo"></img>
                    </Col>
                </Row>
 
                </div>

                <div className="main-content">
                    {reqlist}
                </div>
                {/* <div className="addReq">
                        <img src={plus} alt="add req"></img>
                </div> */}
                <Nav />
            </div>              
        );
        }
    }
}
export default Myreqs;
