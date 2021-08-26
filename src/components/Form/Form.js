import { Component } from "react";
import "./Form.css";
import shortid from "shortid";

class Form extends Component {
  state = {
    name: "",
    number: "",
  };

  nameInputId = shortid.generate();
  numberInputId = shortid.generate();

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };

  handleChange = (e) => {
    const { name, value } = e.currentTarget;

    this.setState({
      [name]: value,
    });
  };

  reset = (e) => {
    this.setState({
      name: "",
      number: "",
    });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form">
        <label htmlFor={this.nameInputId} className="form__label">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
          className="form__input"
          id={this.nameInputId}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer и т. п."
        ></input>
        <label htmlFor={this.numberInputId} className="form__label">
          Number
        </label>
        <input
          type="phone"
          name="number"
          value={this.state.number}
          onChange={this.handleChange}
          className="form__input"
          id={this.numberInputId}
          pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
          title="Номер телефона должен состоять из 11-12 цифр и может содержать цифры, пробелы, тире, пузатые скобки и может начинаться с +"
        ></input>
        <button type="submit" className="form__button">
          Add contact
        </button>
      </form>
    );
  }
}

export default Form;
