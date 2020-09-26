import React, { Component } from "react";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
 
import "react-datepicker/dist/react-datepicker.css";

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {name: '', dob: null, errorMessage: ''};
    
        this.handleSearch = this.handleSearch.bind(this);
    }
    
    handleSearch(event) {
        event.preventDefault();
        const formattedDate = dayjs(this.state.dob).format("YYYY/MM/DD");
        const isValid = this.validateInputs(this.state.name, formattedDate);
        if (isValid) {
            this.props.searchPatient(this.state.name, 
                dayjs(formattedDate).format("YYYY-MM-DD"));
            this.setState({errorMessage: ''});
        }
        else {
            this.setState({errorMessage: "Please enter a valid name and a valid date in the format YYYY/MM/DD"});
        }
    }

    validateInputs = (name, dob) => {
        const isNameValid = /[a-zA-Z]+/.test(name);
        const isDobValid = /^\d{4}\/\d{2}\/\d{2}$/.test(dob);
        return isNameValid && isDobValid;
    };

    render() {
        const {name, dob, errorMessage} = this.state;

        return (
            <form style={{margin: "10px 5px"}} onSubmit={this.handleSearch}>
                <label style={{marginRight: "1rem"}}>
                    First/Last Name: 
                    <input 
                        type="text" 
                        value={name} 
                        onChange={event => this.setState({name: event.target.value.trim()})} 
                        />    
                </label><br/>
                <div>
                    Date of Birth: 
                    <DatePicker
                        selected={dob}
                        onChange={date => this.setState({dob: date})}
                        dateFormat="yyyy/MM/dd"
                        />
                </div>
                <input type="submit" value="Search" style={{margin: "5px 0px"}} /><br />
                {(errorMessage) && (
                    <span style={{color: "red"}}>{errorMessage}</span>
                )}   
            </form>
        );    
    };       
}

export default SearchBar;