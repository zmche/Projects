
export const DeleteFromCart = async (id) => { 
    
    const Atoken = localStorage.getItem("authToken");

     const response =await fetch(`http://localhost:8000/carts/${id}`, 
    {
        method: 'DELETE',
        headers: new Headers({            
            'Authorization': `Bearer ${Atoken}`
        }),
    });
    return response;
    
}
