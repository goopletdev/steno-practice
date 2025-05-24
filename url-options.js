// theory=plover

export function makeQueryParams (options, format=0) {
    let queryParams = [];
    for (const option of Object.keys(options)) {
        queryParams.push(`${option}=${options[option].join()}`);
    }
    return `?format=${format}&${queryParams.join('&')}`;
}

export function parseParams (url) {
    const params = new URLSearchParams(url);
    console.log(params);
    const queryParams = {};
    if (params.get('format') === '0') {
        for (const [key,value] of params) {
            if (key === 'format') continue;
            queryParams[key] = value.split(',');
        }
    }
    return (queryParams);
}