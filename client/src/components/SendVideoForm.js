import React, { Component } from 'react';

class SendVideoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadStatus: false
        }
    }
    render() {
        return(
        <div class="container">
            <form>

                <div className="form-group">
                    <input className="form-control" type="file" />
                </div>   
                <button className="btn btn-success" type>Enviar</button>

            </form>
        </div>
        )
    }
}

export default SendVideoForm;