// in src/dataProvider
import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE,
    fetchUtils,
} from 'react-admin';
import { stringify } from 'query-string';

const API_URL = 'http://localhost:50154/Handler.ashx?cmd=';//'http://jsonplaceholder.typicode.com';

/**
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The Data Provider request params, depending on the type
 * @returns {Object} { url, options } The HTTP request parameters
 */
const convertDataProviderRequestToHTTP = (type, resource, params) => {
    console.log("Komut(1) " + type);
    switch (type) {
    case GET_LIST: {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const start = (page - 1) * perPage;
        const sort = order.toLowerCase();
        const filt = params.filter.q === undefined ? '' : 'q=' + params.filter.q+'&';
        const url = `${API_URL}${resource}&${filt}_start=${start}&_sort=${field}&_order=${sort}&_limit=${perPage}`;
        return { url };
    }
    case GET_ONE:
        const url = `${API_URL}${resource}&id=${params.id}`;
        return { url };
    case GET_MANY: {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        let url = `${API_URL}/${resource}?${stringify(query)}`;
        return { url };
    }
    case GET_MANY_REFERENCE: {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, (page * perPage) - 1]),
            filter: JSON.stringify({ ...params.filter, [params.target]: params.id }),
        };
        return { url: `${API_URL}/${resource}?${stringify(query)}` };
    }
    case UPDATE:
        const options = { method: 'PUT', body: JSON.stringify(params.data) };
        return {
            url: `${API_URL}${resource}&id=${params.id}`,
            options
        };
    case CREATE:
        return {
            url: `${API_URL}${resource}`,
            options: { method: 'POST', body: JSON.stringify(params.data) },
        };
    case DELETE:
        return {
            url: `${API_URL}${resource}&id=${params.id}`,
            options: { method: 'DELETE' },
        };
    default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }
};

/**
 * @param {Object} response HTTP response from fetch()
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The Data Provider request params, depending on the type
 * @returns {Object} Data Provider response
 */
const convertHTTPResponseToDataProvider = (response, type, resource, params) => {
    console.log("Komut(2) " + type);
    const { json } = response;
    switch (type) {
    case GET_LIST:
        return {
            data: json.data.map(x => x),
            total: parseInt(json.count, 10)
        };
    case CREATE:
        return { data: { ...params.data, id: json.data[0].id } };
    case DELETE:
    case GET_ONE:
    case UPDATE:
      const don = json.data[0];
      return { data: don };
    default:
        const data = json.data;
        return { data };
    }
};

/**
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for response
 */
export default (type, resource, params) => {
    const { fetchJson } = fetchUtils;
    const { url, options } = convertDataProviderRequestToHTTP(type, resource, params);
    return fetchJson(url, options)
        .then(response => convertHTTPResponseToDataProvider(response, type, resource, params));
};
