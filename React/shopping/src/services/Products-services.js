
const API_URL = "http://localhost:8000/products/"

export const fetchProducts = async (page = 1, limit = 9, ordering = 'asc', maxValue = null, minValue = null) => {

    let url = `${API_URL}?_page=${page}&_limit=${limit}`;

    const Atoken = localStorage.getItem("authToken");

    if (ordering) {
        url += `&_sort=price&_order=${ordering}`
    }

    if (maxValue) {
        url += `&price_lte=${maxValue}`
    }

    if (minValue) {
        url += `&price_gte=${minValue}`
    }

    const response = await fetch(url,
        {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${Atoken}`
            }),
        });

    return await response.json();
};
