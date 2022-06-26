export function axiosOctopus ( props )
{
    let result = undefined;
    if ( props && Object.prototype.toString.call( props ) === '[object Object]' )
    {
        let path = ( props.path && Object.prototype.toString.call( props.path ) === '[object String]' ) ? `/${props.path}` : "",
            method = ( props.method && Object.prototype.toString.call( props.method ) === '[object String]' ) ? `${props.method}` : "get",
            id = ( props.id && ( Object.prototype.toString.call( props.id ) === '[object Number]' || Object.prototype.toString.call( props.id ) === '[object String]' ) ) ? `/${props.id}` : "",
            pathf = ( props.path2 && Object.prototype.toString.call( props.path2 ) === '[object String]' ) ? `/${props.path2}` : "",
            header = { 'X-Requested-With': 'XMLHttpRequest' },
            data = ( props.data && Object.prototype.toString.call( props.data ) === '[object Object]' && ( Object.keys( props.data ) ).length > 0 ) ? props.data : {},
            params = ( props.query && Object.prototype.toString.call( props.query ) === '[object Object]' && ( Object.keys( props.query ) ).length > 0 ) ? props.query : {};
        if ( props.header && Object.prototype.toString.call( props.header ) === '[object Object]' && ( Object.keys( props.header ) ).length > 0 )
        {
            for ( let k in props.header )
            {
                header[ k ] = props.header[ k ]
            }
        }
        result = {
            // `url` is the server URL that will be used for the request
            url: `${pathf}${id}${path}`,
            // `method` is the request method to be used when making the request
            method: method, // default

            // `baseURL` will be prepended to `url` unless `url` is absolute.
            // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
            // to methods of that instance.
            baseURL: "https://service.inaras.be/octopus-rest-api/v1",

            // `transformRequest` allows changes to the request data before it is sent to the server
            // This is only applicable for request methods 'PUT', 'POST', 'PATCH' and 'DELETE'
            // The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
            // FormData or Stream
            // You may modify the headers object.
            transformRequest: [ function ( data, headers )
            {
                // Do whatever you want to transform the data

                return data;
            } ],

            // `transformResponse` allows changes to the response data to be made before
            // it is passed to then/catch
            transformResponse: [ function ( data )
            {
                // Do whatever you want to transform the data

                return data;
            } ],

            // `headers` are custom headers to be sent
            headers: header,

            // `params` are the URL parameters to be sent with the request
            // Must be a plain object or a URLSearchParams object
            params: params,
            // `data` is the data to be sent as the request body
            // Only applicable for request methods 'PUT', 'POST', 'DELETE , and 'PATCH'
            // When no `transformRequest` is set, must be of one of the following types:
            // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
            // - Browser only: FormData, File, Blob
            // - Node only: Stream, Buffer
            data: data,

            // `timeout` specifies the number of milliseconds before the request times out.
            // If the request takes longer than `timeout`, the request will be aborted.
            timeout: 1000, // default is `0` (no timeout)

            // `withCredentials` indicates whether or not cross-site Access-Control requests
            // should be made using credentials
            withCredentials: false, // default
            // `responseType` indicates the type of data that the server will respond with
            // options are: 'arraybuffer', 'document', 'json', 'text', 'stream'
            //   browser only: 'blob'
            responseType: 'json', // default

            // `responseEncoding` indicates encoding to use for decoding responses (Node.js only)
            // Note: Ignored for `responseType` of 'stream' or client-side requests
            responseEncoding: 'utf8', // default

            // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
            xsrfCookieName: 'XSRF-TOKEN', // default

            // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
            xsrfHeaderName: 'X-XSRF-TOKEN', // default
            // `maxContentLength` defines the max size of the http response content in bytes allowed in node.js
            maxContentLength: 7000,

            // `maxBodyLength` (Node only option) defines the max size of the http request content in bytes allowed
            maxBodyLength: 7000,

            // `validateStatus` defines whether to resolve or reject the promise for a given
            // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
            // or `undefined`), the promise will be resolved; otherwise, the promise will be
            // rejected.
            validateStatus: function ( status )
            {
                return status >= 200 && status < 300; // default
            },
            // `httpAgent` and `httpsAgent` define a custom agent to be used when performing http
            // and https requests, respectively, in node.js. This allows options to be added like
            // `keepAlive` that are not enabled by default.
            httpAgent: new http.Agent( { keepAlive: true } ),
            httpsAgent: new https.Agent( { keepAlive: true } )

        }
    }
    return result;

}

export const postAuthentication = ( uid, user, pwd ) =>
{
    return {
        method: "post",
        header: {
            softwareHouseUuid: ( uid && ( Object.prototype.toString.call( uid ) === '[object Number]' || Object.prototype.toString.call( uid ) === '[object String]' ) ) ? `${uid}` : process.env.UID
        },
        data: {
            user: ( user && Object.prototype.toString.call( user ) === '[object String]' ) ? `${user}` : process.env.USER,
            password: ( pwd && Object.prototype.toString.call( pwd ) === '[object String]' ) ? `${pwd}` : process.env.PASSWORD
        },
        path: "authentication"
    }
}

export const getDossiers = (token) =>
{
    return {
        method: "get",
        header: {
            Token: (token && Object.prototype.toString.call( token ) === '[object String]' )  ? `${token}` : ""
        },
        path: "dossiers"
    }
}

export const postDossiersToken = ( token, dossierId, localeId=0 ) =>
{
    return {
        method: "post",
        header: {
            Token: ( token && Object.prototype.toString.call( token ) === '[object String]' ) ? `${token}` : ""
        },
        query: {
            dossierId: ( dossierId && Object.prototype.toString.call( dossierId ) === '[object Number]' ) ? dossierId : 0,
            localeId: ( localeId && Object.prototype.toString.call( localeId ) === '[object Number]' ) ? localeId : 0
        },
        path: "dossiers"
    }
}


