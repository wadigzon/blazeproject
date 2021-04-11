import React from 'react'
import { Component } from "react";
import LoadingComponent from '../components/LoadingComponent'
import { toastError } from "../utils/toastrFunctions";
import { BASE_URL_CUSTOMERS } from "../constants/urls";
import { getRequest } from "../utils/urlFunctions";

export default class DisplayData extends Component {
    constructor(props) {
        super();
        this.state = {
            isLoading: true,
            data: undefined
        };
    }
    componentDidMount() {

        const callback = (data) => {
            this.setState({ isLoading: false, data: data });
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
        const { isLoading  } = this.state

        return isLoading ?
        (<LoadingComponent isLoading />) :
        (
            <div className='displaydata'>
                <h1>Display Data</h1>
            </div>
        )
    }
}
