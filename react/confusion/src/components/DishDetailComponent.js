import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';

class DishDetail extends Component {
    constructor (props){
        super(props);
    }
    renderDish(dish){
        return(
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }
    renderComments(comments){
        const listofComment = comments.map((commentobj) => {
            return(
                <li>
                    <p>{commentobj.comment}</p>
                    <p>{commentobj.author}{commentobj.date}</p>
                </li>
            );
        });
        if(comments==null)
            return (
                <div></div>
            );
        else
            return(
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {listofComment}
                    </ul>
                </div>
            );
    }
    render() {
        if(this.props.dish==null)
            return(
                <div></div>
            );
        else 
            return(
                <div className="row">
                    <div className="col-md-5 m-1">
                        {this.renderDish(this.props.dish)}
                    </div>
                    <div className="col-md-5 m-1">
                        {this.renderComments(this.props.dish.comments)}
                    </div>
                </div>
                
            );
    }
}

export default DishDetail;