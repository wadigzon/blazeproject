import React, {Component} from 'react'
import "./loading.css"
export default class LoadingComponent extends Component {

    render() {
        const {isLoading} = this.props;

        if(isLoading) {
            return (
                <div className="loader" ></div>
            )
        }
        else {
            return null;
        }
    }
}