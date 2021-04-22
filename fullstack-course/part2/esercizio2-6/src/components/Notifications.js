import React from 'react' 

const Notification = ( { message, isError } ) => {
    const notificationErrortStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    const notificationDefaultStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    if (message === null) {
        return null
    }
    else if (isError) {
        return (
            <div style={notificationErrortStyle}>
                {message}
            </div>
        )}
    else {
        return (
            <div style={notificationDefaultStyle}>
                {message}
            </div>
        )}
}

export default Notification