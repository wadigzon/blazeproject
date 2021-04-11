import React from 'react'
import LoadingComponent from '../components/LoadingComponent'
import { Component } from "react";
import { toastError } from "../utils/toastrFunctions";
import { deleteRequest } from "../utils/urlFunctions";
import { DELETE_ALL_CUSTOMERS_URL } from "../constants/urls";

export default class DeleteAll extends Component { 
    constructor(props) {
        super();
        this.state = {
            isLoading: true,
        };
    }
    componentDidMount() {
        const callback = (data) => {
            this.setState({ isLoading: false, count: data.count });

        }
        const errorCallback = (body) => {
            const message = body && body.message ? body.message : "Failed to retrieve customer count";
            // stop spinning
            this.setState({ isLoading: false });
            toastError(message);
        }

        this.deleteAllCustomers(callback, errorCallback);
    }
    deleteAllCustomers(callback, errorCallback) {
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
        return deleteRequest(DELETE_ALL_CUSTOMERS_URL, onSuccess, onError)
    }


    render() {
        const { isLoading } = this.state

        return isLoading ?
            (<LoadingComponent isLoading />) :
            ( <div className='deleteall'>
                <h1>Customers Deleted!</h1>
            </div> );
    }

}
