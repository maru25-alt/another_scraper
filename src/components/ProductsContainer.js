import React, { useEffect, useState} from 'react'
import Product from './Product';
import Loading from './Loading';
import { useStateValue } from '../app/StateProvider';
import {getData} from '../app/reducer'


function ProductsContainer() {
    const [ {products, loading, query, num , priceby, searchArray, page, shops}, dispatch] = useStateValue();
    const [btn_loading, setloading] = useState(false)

    useEffect(() => {
        dispatch({
            type: "SET_LOADING",
            payload: true
        });
        dispatch({
            type: "SET_LOADING",
            payload: false
        });
        
    }, [dispatch])

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

   const handleSearchProducts = (e) => {
         e.preventDefault();
         const value = e.target.value;
         dispatch({
            type: "SET_LOADING",
            payload: true
        });
         getData(value, num, priceby, page, shops).then(res => {
            dispatch({
                type: "GET_PRODUCTS",
                payload: res.data
              });
              dispatch({
                type: "SET_QUERY",
                payload: value
              })
              dispatch({
                type: "SET_LOADING",
                payload: false
               });
         }).catch(err => {
            console.log(err);
            dispatch({
              type: "SET_LOADING",
              payload: false
             });
        });
    }

    const handlePagination = () => {
       setloading(true)
        let new_page = page + 1
        dispatch({
            type: "SET_PAGE",
            payload: new_page
        })
         getData(query, num, priceby, new_page, shops).then(res => {
            dispatch({
                type: "GET_PRODUCTS",
                payload: res.data
              });
              setloading(false)
    
         }).catch(err => {
            console.log(err);
            setloading(false)
        });

    }
   
  
    return (
        <div className="products">
            <h5> {query !== "" ? <> {capitalizeFirstLetter(query)} (results) </>  : <>My Feeds</>} </h5>
            {loading ?  <Loading /> :
             <>
             {query === "" ?
             <> {searchArray.map((item) => {
                return(
                 <label key={item._id} className="searchProducts">
                 <input onClick={handleSearchProducts} type="radio" name="search" value={item.item} id={item._id} />
                 <img src="https://d17kynu4zpq5hy.cloudfront.net/igi/dozuki/rH6Tb1S1BhLFwEr4.medium" alt="product item"/>
                 <p>{item.item}</p>
               </label>
               
             )}
             )}</> : 
            <>
                {products.length <= 0 ? <div className="notFound">No Products Found!</div> : 
                   <div className="row container">
                       {
                         products.map((product, index) =>  <Product  key={index} product={product}/>)
                       }
                      
                   </div>
                }
                <div className="loading__button">
                  <button disabled={btn_loading} onClick={handlePagination} className="btn btn-info loading__button">Load More</button>
                  {btn_loading && <div className="spinner-border text-secondary" role="status"></div>}
                </div>
                
            </>
           }
            </>
          }
        </div>
    )
}

export default ProductsContainer
