import axios from "axios"

export const SingUpApi = (id, pw, name) => {

    const url = '/api/user';

    const data = {
        id: id,
        pw: pw,
        name: name
    }
    console.log(data);
    
    return axios.post(url,data)
}

export const writeApi = (url, data, config) => {

    console.log(url, data, config)

    

    return axios.post(url,data, config)

}

export const delApi = (mo) => {
    
    const url ='/api/data/' + mo;

    return axios.delete(url)
}


export const callApi = (setDb) => {
    axios.get('/api/user')
    .then(response => {
        setDb({ data: response.data })
        console.log(response.data)
    }, error => {
        console.log(error);
    })

}

export const readApi = (setDb) => {
    axios.get('/api/data')
    .then(response => {
        setDb({ data: response.data })
        console.log(response.data)
    }, error => {
        console.log(error);
    })

}
