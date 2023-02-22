

export const searchProducts = async (input, setIsloading) => {
    setIsloading(true);
    let url = 'http://localhost:8000/products?'
    const Atoken = localStorage.getItem("authToken");

    if (input) {
      url += `q=${input}`;
    }
    const response = await fetch(url,
      {
        method: 'GET',
        headers: new Headers({
          'Authorization': `Bearer ${Atoken}`
        }),
      });
    const data = await response.json();        
    setTotalPages(1);
    setProducts(data);
    if(data){
      setIsloading(false);
    }
    
  }
