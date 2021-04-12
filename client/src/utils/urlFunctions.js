function handleFailResponse(baseURL, e, onFail, body, overrideDefaults) {
    if(e && e.stack) {
        console.error(`stack: ${e.stack}`);
    }
    if(body && body.message) {
        console.error(`error ${body.message}`)
    }
    if(onFail) {
        return onFail(body, e);
    }
    else if(!overrideDefaults) {
        console.error(`error on request`)
    }
}

function handleSuccessResponse(body, onSuccess, overrideDefaults) {
    if(!overrideDefaults) {
        const { status, errorType } = body;
        if(status !== "success") {
            if(errorType === "authorization_denied") {
                console.error('authorization denied')
                return body;
            }
        }
    }
    if(onSuccess === undefined) {
        return body;
    }
   return onSuccess(body);
}


/**
 * Returns a value if not null or undefined and a default otherwise.
 */
export function coalesce(potentiallyUndefinedValue, valueIfUndefined) {
    //Sometimes it's viable to simply return potentiallyUndefinedValue || valueIfUndefined.
    //But, that fails if potentiallyUndefinedValue can hold a value that can be treated as falsy.
    //i.e. a = 0; b = 2; a || b will return 2, whereas it really should return 0.

    const valueToReturnIfUndefined = (valueIfUndefined === undefined || valueIfUndefined === null) ?
    {} : valueIfUndefined;

    return (potentiallyUndefinedValue === undefined || potentiallyUndefinedValue === null) ?
        valueToReturnIfUndefined : potentiallyUndefinedValue;
}

/**
 * Perform a restful query expected to take json and return json.
 * @param {*} baseURL 
 * @param {*} payload 
 * @param {*} onSuccess method to call on the jsonified value upon success.
 * @param {*} onFail method to call upon receipt of a failed request.
 * @param {*} overrideDefaults if true, will not perform basic validation and other processing before calling callbacks.
 */
export function postRequest(baseURL, payload, onSuccess , onFail, overrideDefaults) {
    let myInit = {
        method: 'post',
        headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(payload)
    };

    return fetch(baseURL, myInit).then( (results, e) => {
        // Check for Status.OK (200) before attempting to parse JSON from results
        if(results.status === 404) {
            console.error(`Received a 404 error from ${baseURL} (Either the server is down or the requested resource was unavailable)`);
            handleFailResponse(baseURL, e, onFail, overrideDefaults);
            return 'response_already_handled';
        }
        if (results !== undefined) {
            const result = results.json();
            return result;
        } 
        else {
            return undefined;
        }
    }).then(body => {
        if(body === 'response_already_handled') {
            return;
        }
        if (body === undefined || body === null || coalesce(body.status, 'success') !== 'success') {
            return handleFailResponse(baseURL, new Error(`Failed to process request. See log for details`), onFail, body, overrideDefaults);
        }

        //Silently ignore returns associated with pages that we aren't on anymore.
        return handleSuccessResponse(body, onSuccess, overrideDefaults);
    }).catch((e, body) => {
        console.error('Error on request');
        return handleFailResponse(baseURL, e, onFail, overrideDefaults);
    });
}

/**
 * Perform a restful query expected to take params via the url and return json.
 * @param {*} baseURL 
 * @param {*} onSuccess method to call on the jsonified value upon success.
 * @param {*} onFail method to call upon receipt of a failed request.
 * @param {*} overrideDefaults if true, will not perform basic validation and other processing before calling callbacks.
 */
export function getRequest(baseURL, onSuccess , onFail, overrideDefaults) {
    let myInit = {
        method: 'get',
        mode: 'cors',
        cache: 'default'
    };

    return fetch(baseURL, myInit).then(results => {
        // Check for Status.OK (200) before attempting to parse JSON from results
        if (results !== undefined && results.status === 200) {
            return results.json();
        } else {
            return undefined;
        }
    }).then(body => {
        if (body === undefined) {
            return handleFailResponse(baseURL, new Error(`Failed to retrieve ${baseURL}`), onFail, overrideDefaults);
        }
        return handleSuccessResponse(body, onSuccess, overrideDefaults);
    }).catch((e) => {
        return handleFailResponse(baseURL, e, onFail, overrideDefaults);
    });
}

export function deleteRequest(baseURL, onSuccess, onFail, overrideDefaults) {
    let myInit = {
        method: 'delete',
        mode: 'cors',
        cache: 'default',
        credentials: "include"
    };

    return fetch(baseURL, myInit).then(results => {
        // Check for Status.OK (200) before attempting to parse JSON from results
        if (results !== undefined && results.status === 200) {
            return results.json();
        } else {
            return undefined;
        }
    }).then(body => {
        if (body === undefined) {
            return handleFailResponse(baseURL, new Error(`Failed to retrieve ${baseURL}`), onFail, overrideDefaults);
        }
        return handleSuccessResponse(body, onSuccess, overrideDefaults);
    }).catch((e) => {
        return handleFailResponse(baseURL, e, onFail, overrideDefaults);
    });

}