import { toast } from "react-toastify"
import React from "react"
import { coalesce } from "./urlFunctions";

export function toastError(msg, options) {
    const basicOptions = { type: toast.TYPE.ERROR, hideProgressBar : true, autoClose : 10000 };
    const combinedOptions = {
        ...basicOptions,
        ...coalesce(options, {})
    }
    toast(<div>{msg}</div>, combinedOptions);
}

export function toastSuccess(msg, options) {
    const basicOptions = { type: toast.TYPE.SUCCESS, hideProgressBar : true };
    const combinedOptions = {
        ...basicOptions,
        ...coalesce(options, {})
    }
    toast(<div>{msg}</div>, combinedOptions);
}

export function toastWarning(msg, options) {
    const basicOptions = { type: toast.TYPE.WARNING, hideProgressBar : true };
    const combinedOptions = {
        ...basicOptions,
        ...coalesce(options, {})
    }
    toast(<div>{msg}</div>, combinedOptions);
}

export function toastInfo(msg, options) {
    const basicOptions = { type: toast.TYPE.INFO, hideProgressBar : true };
    const combinedOptions = {
        ...basicOptions,
        ...coalesce(options, {})
    }
    toast(<div>{msg}</div>, combinedOptions);
}