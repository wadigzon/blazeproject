import React from 'react'
import { Component } from "react";
import LoadingComponent from '../components/LoadingComponent'
import { toastError } from "../utils/toastrFunctions";
import { BASE_URL_CUSTOMERS } from "../constants/urls";
import { getRequest } from "../utils/urlFunctions";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export default class DisplayData extends Component {
    constructor(props) {
        super();
        this.state = {
            isLoading: true,
            rowData: undefined
        };
    }
    componentDidMount() {

        const callback = (data) => {
            this.setState({ isLoading: false, rowData: data });
            console.log(data);
        }
        const errorCallback = (body) => {
            const message = body && body.message ? body.message : "Failed to insert customers";
            // stop spinning
            this.setState({ isLoading: false });
            toastError(message);
        }

        this.insertCustomers(callback, errorCallback);
    }

    insertCustomers(callback, errorCallback) {
        const onSuccess = (body) => {
            if(body !== undefined) {
                // data it's the body already
                callback(body);
            }
            else {
                errorCallback(body);
            }
        }

        const onError = (e) => {
            console.error(e);
            errorCallback();
        }
        return getRequest(BASE_URL_CUSTOMERS, onSuccess, onError)

    }

    render() {
        const { isLoading, rowData  } = this.state

        return isLoading ?
        (<LoadingComponent isLoading />) :
        (
            <div>
                <div style={{paddingLeft: "10px"}}>
                <h1>Display Data</h1>
                </div>

                <div className="ag-theme-alpine" style={{ height: 400, width: '80%', paddingLeft:'10px', paddingTop:'10px' }}>
                    <AgGridReact
                        rowData={rowData}>
                        <AgGridColumn field="firstName" sortable={ true } filter={ true }></AgGridColumn>
                        <AgGridColumn field="lastName" sortable={ true } filter={ true }></AgGridColumn>
                        <AgGridColumn field="email" sortable={ true } filter={ true }></AgGridColumn>
                        <AgGridColumn field="phoneNumber" sortable={ true } filter={ true }></AgGridColumn>
                    </AgGridReact>
                </div>
            </div>
        )
    }
}
