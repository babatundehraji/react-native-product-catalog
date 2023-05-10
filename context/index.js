import { createContext, useEffect, useState } from "react";

export const Context = createContext(null);

const ProductContext = ({children}) => {

    const [products, setProducts] = useState([])

    //Loading
    const [loading, setLoading] = useState(false)

    // Favourite
    const [favouriteItems, setFavouriteItems] = useState([]);

    const addToFavourite = (productId, reaseon) =>{
        let cpyFavoriteItems = [...favouriteItems];
        const index = cpyFavoriteItems.findIndex(item => item.id === productId);

        if(index === -1){
            const getCurrentProductItem =  products.find(item => item.id === productId );
            cpyFavoriteItems.push({
                title: getCurrentProductItem.title,
                id: productId,
                reaseon,
            })
        }
        setFavouriteItems(cpyFavoriteItems);
    };


    useEffect(()=>{
        setLoading(true);
        async function getProductsFromAPI() {
            const apiRes = await fetch('https://dummyjson.com/products');
            const finalResult = await apiRes.json();

            if(finalResult){
                setTimeout(()=>{
                    setLoading(false);
                }, 2000);
                setProducts(finalResult.products)
            }
        }

        getProductsFromAPI();
    }, [])


    return (
        <Context.Provider value={{products, loading, addToFavourite, favouriteItems }}>
            {children}
        </Context.Provider>
    )
}

export default ProductContext