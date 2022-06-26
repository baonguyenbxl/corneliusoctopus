import axios from 'axios';
import {axiosOctopus, postAuthentication, getDossiers} from './octopus.data'
export async function authentify ()
{
    // to avoid getting exceptions but possible status code > 300, always give the right params type  
    let resp = "";
    try
    {
        // get config for axios request from template created by functions in file octopus.data > postAuthentication
        const config = axiosOctopus( postAuthentication() );
        const { data } = await axios.request( config );
        if ( data && data[ "token" ] ) resp= data["token"];
    } catch (error) {
        console.log('Error authentication: ',error);
    }
    return resp;
}

export async function getDossiers ( token )
{
    let resp = [];
    if ( token && Object.prototype.toString.call( token ) === '[object String]' && token.length>0 )
    {
        try
        {
            // get config for axios request from template created by functions in file octopus.data > getDossiers
            const config =axiosOctopus(getDossiers(token));
            const { data } = await axios.request( config );
            if ( data ) resp = data;
        } catch ( error )
        {
            console.log( 'Error getting Dossiers: ', error );
        }
    }
    return resp;
}

// example of function to have list of dossiers
export function listDossiers ()
{
    authentify().then( v => getDossiers ).catch( e => { console.log( e ) } );
}
