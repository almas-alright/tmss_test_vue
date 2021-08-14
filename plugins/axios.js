export default function({$axios, store}){
    $axios.onError(error => {
        if(error.response.status === 422)
        {
            store.dispatch('validation/setErrors', error.response.data.errors);
        }
        return Promise.reject(error);
    });

    $axios.onRequest(config => {
        store.dispatch('validation/clearErrors');
        config.headers.common['X-Authorization'] = 'rDjuAubKSzPHklLWL8GeOLDXK3kR4qipssMsFYMx4e30PYL6Ok5BCS6aA3nrNd33';
    })
}

