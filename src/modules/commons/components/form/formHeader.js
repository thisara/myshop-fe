import React from 'react';

import LoadingIcon from '../../../../images/loading.svg';

const FormHeader = (props) => {

    if (props.loading === true || props.resultMessage) {
        return (
            <div>
                <Header {...props} />

                <div className="form-loading">
                    <Loading {...props} />{props.loading && props.loadingMessage}{props.resultMessage}
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <Header {...props} />
            </div>
        )
    }
}

const Loading = (props) => {

    if (props.loading) {
        return (
            <>
                <img src={LoadingIcon} alt='cart' width='30' height='30' />
            </>
        )
    } else {
        return (
            <></>
        )
    }
}

const Header = (props) => {
    return (
        <>
            <hr />
            <h5>{props.title}</h5>
            <hr />
        </>
    );
}

export default FormHeader;