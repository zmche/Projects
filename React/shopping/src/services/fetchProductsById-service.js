import { fetchCart } from "./fetchCart-service";

export const fetchProductsById = async () => {

    const data = await fetchCart();      

    if(data.length > 0){

    const Atoken = localStorage.getItem("authToken");
    let url = 'http://localhost:8000/products?'


    for (let i = 0; i < data.length; i++) {
        url += `id=${data[i].productId}&`  
        
    }

    url = url.slice(0, -1)   

    const response = await fetch(url,
        {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${Atoken}`
            }),
        });
       
    return await response.json();
} else {
    return [];
}
// ese imito gavakete ro tu carieli [] ar brundeba mashin yvela produqti moqonda
};

