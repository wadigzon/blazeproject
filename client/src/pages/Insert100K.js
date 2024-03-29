import React from 'react'
import { Component } from "react";
import LoadingComponent from '../components/LoadingComponent'
import { toastError } from "../utils/toastrFunctions";
import { postRequest } from "../utils/urlFunctions";
import { INSERT_CUSTOMERS_URL } from "../constants/urls";
import customers from '../data/100KCustomers.json'

export default class Insert100K extends Component {
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

        const payload = customers;

        const onError = (e) => {
            console.error(e);
            errorCallback();
        }
        return postRequest(INSERT_CUSTOMERS_URL, payload, onSuccess, onError)

    }

    render() {
        const { isLoading, count } = this.state

        return isLoading ?
        (<LoadingComponent isLoading />) :
        (
            <div className='insert100k'>
                <h1>Inserted {count} customer</h1>
            </div>
        )
    }
}
