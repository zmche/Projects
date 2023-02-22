
export const addToCart = async (productId) => {

    const Atoken = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");
  
    const response = await fetch("http://localhost:8000/carts",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Atoken}`
              },            
            body: JSON.stringify({
                productId,
                userId
            }),
        });      

    return await response.json();
};