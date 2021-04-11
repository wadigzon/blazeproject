import React from 'react'
import { Component } from "react";
import LoadingComponent from '../components/LoadingComponent'
import { toastError } from "../utils/toastrFunctions";
import { getRequest } from "../utils/urlFunctions";
import { GET_CUSTOMERS_COUNT_URL } from "../constants/urls";

export default class DisplayCount extends Component {
    constructor(props) {
        super();
        this.state = {
            isLoading: true,
            count: undefined
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

        this.getCustomerCount(callback, errorCallback);
    }

    getCustomerCount(callback, errorCallback) {
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
        return getRequest(GET_CUSTOMERS_COUNT_URL, onSuccess, onError)
    }

    render() {
        const { isLoading, count } = this.state

        return isLoading ?
            (<LoadingComponent isLoading />) :
            ( <div className='displaycount'>
                <h1>Customers Count :{count} </h1>
            </div> );
    }
}
