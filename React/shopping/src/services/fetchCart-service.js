
export const fetchCart = async () => {     

    const Atoken = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");     
    
    const response = await fetch(`http://localhost:8000/user/${userId}/carts`, 
    {
        method: 'GET',
        headers: new Headers({
            'Authorization': `Bearer ${Atoken}`
        }),
    });

    return await response.json();
};