import React, { Component } from "react";
import { getPatients } from "../services";
import SearchBar from "./SearchBar";
import dayjs from "dayjs";

class Table extends Component {
    state = {
      patients: [],
      name: undefined,
      dob: undefined,
      lastLoadedDateTime: '',
    };
  
    componentDidMount() {
      this.getPatientsApiCall(this.state.name, this.state.dob);
    }

    getPatientsApiCall = (name, dob) => {
      getPatients(name, dob).then((res) => {
        const flattenedPatientObj = this.flattenPatientObj(res);  
        const patientObjWithDobSorted = flattenedPatientObj
          .filter(patient => patient.dob !== undefined)
          .sort(this.compare);
        const patientObjNoDob = flattenedPatientObj.filter(patient => patient.dob === undefined);

        const fullPatientSortedList = patientObjWithDobSorted.concat(patientObjNoDob);
        this.setState({ patients: fullPatientSortedList });
        this.changeLastLoadedDateTime(new Date())
      });
    }
    
    changeLastLoadedDateTime = (date) => {
      const formattedDateTime = dayjs(date).format("ddd DD MMM YYYY [at] HH:mm:ss").toString();
      this.setState({lastLoadedDateTime: formattedDateTime});
    }
  
    flattenPatientObj = (response) => {
      return (response.data.entry || []).map((item) => {
        const name = item.resource.name || [];
        return {
          id: item.resource.id,
          name: `${((name[0] || {}).given || []).join(" ")} ${
            (name[0] || {}).family
          }`,
          gender: item.resource.gender,
          dob: item.resource.birthDate,
          photo:
            "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
        };
      });
    };

    compare = (a, b) => {   
      const dobA = new Date(a.dob);
      const dobB = new Date(b.dob);
      return dobA - dobB;
    };
    
    searchPatient = (name, dob) => {
      this.setState({name: name, dob: dob});
      this.getPatientsApiCall(name, dob);
    };
  
    render() {
      const { patients, lastLoadedDateTime } = this.state;
      return (
        <>
          <SearchBar searchPatient={this.searchPatient}/>
          <div style={{margin: "5px", marginBottom: "10px"}}>Results as of {lastLoadedDateTime}</div>
          <table>
            <thead>
              <tr>
                <th>Profile Image</th>
                <th>Full Name</th>
                <th>Gender</th>
                <th>Date of Birth</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td>
                    <img
                      src={patient.photo}
                      alt="Avatar"
                      style={{ height: 50, width: 50, borderRadius: "50%" }}
                    />
                  </td>
                  <td>{patient.name}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.dob}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    }
  }

export default Table;