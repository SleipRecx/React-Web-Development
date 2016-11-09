import React, { Component } from 'react';
import myBookStore from '../stores/MyBookStore';
import ResultObject from './ResultObject';
import '../../public/styles/style.css';
import label_converter from '../data/label_converter';
import ReactDOM from 'react-dom';
import * as LoginActions from '../stores/LoginActions'

export default class MyBooks extends Component {
  constructor(props) {
      super(props);
      this.state = {data: myBookStore.getAllBooks()};
      this.buttonPressed = this.buttonPressed.bind(this);
  }

  componentWillMount(){
    myBookStore.on("change", () =>{
      this.setState({
        data: myBookStore.getAllBooks()
      })
      this.clearForm()
    });

}

clearForm(){
  ReactDOM.findDOMNode(this.refs.price).value = ""
  ReactDOM.findDOMNode(this.refs.title).value = ""
  ReactDOM.findDOMNode(this.refs.author).value = ""
}

buttonPressed(e) {
    e.preventDefault();
    var form = e.target
    var object = {}
    object.price = ReactDOM.findDOMNode(this.refs.price).value
    object.state = form.elements.optradio.value
    object.title =  ReactDOM.findDOMNode(this.refs.title).value
    object.author = ReactDOM.findDOMNode(this.refs.author).value
    LoginActions.addBook(object);
}

  render() {
      return (
        <div>
              <br/>
              <center><h3>Your Books</h3></center>
                  <div className="result-table container">
                      <div className="row">
                          <ul className="list-inline row result-object result-object-header">
                              <li className="col-sm-3">
                                  Title
                              </li>
                              <li className="col-sm-2">
                                  State
                              </li>
                              <li className="col-sm-1 price">
                                  Price
                              </li>
                              <li className="col-sm-3">
                                  User
                              </li>
                              <li className="col-sm-1">
                                  User Rating
                              </li>
                              <li className="col-sm-2">
                                  Added
                              </li>
                          </ul>
                          {this.state.data.map(function(l){ return (
                              <ResultObject key={l.book_id} title={l.title} state={l.state} price={l.price} user={l.first_name + " " + l.last_name}
                                            userRating={l.rating} added={l.date_added.split("T")[0]} image={l.image_link} />
                          )})}
                      </div>
                  </div>
              <center><h3>Add New Book</h3></center>

              <div className="input-wrapper">
              <form onSubmit={this.buttonPressed}>

                <div className="input-group">
                <span className="input-group-addon" id="basic-addon3">Title</span>
                <input type="text" className="form-control" ref="title" id="basic-url" aria-describedby="basic-addon3"/>
              </div>

              <div className="input-group">
              <span className="input-group-addon" name="author" id="basic-addon3">Author</span>
              <input type="text" className="form-control" ref="author" id="basic-url" aria-describedby="basic-addon3"/>
              </div>

              <div className="input-group">
                <span className="input-group-addon">kr</span>
                <input className="form-control" ref="price" type="number" placeholder="Price" id="example-number-input"/>
              </div>

              <div className="input-group">
              <div className="radio-inline">
                <label><input type="radio" name="optradio" value="New" /><span className={"label label-" + label_converter("New")} >New</span></label>
              </div>
              <div className="radio-inline">
                <label><input type="radio" name="optradio" value="As New" /><span className={"label label-" + label_converter("As New")} >As New</span></label>
              </div>
              <div className="radio-inline">
                <label><input type="radio" name="optradio" value="Normal Use" /><span className={"label label-" + label_converter("Normal Use")} >Normal Use</span></label>
              </div>
              <div className="radio-inline">
                <label><input type="radio"  name="optradio" value="Readable" /><span className={"label label-" + label_converter("Readable")} >Readable</span></label>
              </div>

              </div>

              <center>
              <div className="input-group">
                <input type="submit" className="btn btn-info" value="Submit Book"/>
              </div>
              </center>
              </form>

            </div>
            <br/>

          </div>
      );
  }
}
