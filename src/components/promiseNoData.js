import React from 'react';


export default function promiseNoData({promise, data, error}) {
    return !promise && "no data"
            || error && <h1>error</h1>
            || !data && <img src="http://www.csc.kth.se/~cristi/loading.gif"></img>
}