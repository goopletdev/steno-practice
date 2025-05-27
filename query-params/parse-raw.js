const currentURL = window.location.search;
const params = new URLSearchParams(currentURL);

document.searchParams = {};

for (const [key,value] of params) {
    document.searchParams[key] = value.split(' ');
}
