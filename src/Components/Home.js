import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
// import Pagination from 'react-bootstrap/Pagination';
// import axios from "axios"

const Home = () => {
    //const [data, setdata] = useState([]);
    //const [products, setProducts] = useState([])
    const [pageData, setPageData] = useState([]);
   // const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
   // console.log(pageCount);
    const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)

  const fetchProducts = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=100`)
    const data = await res.json()

    console.log(data);

    if (data && data.products) {
      setProducts(data.products)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

   

    // useEffect(() => {
    //   const pagedatacount = Math.ceil(data.length/5);
      
    //   setPageCount(pagedatacount);

    //   if(page){
    //     const LIMIT =5;
    //     const skip= LIMIT *page;
    //     const dataskip= data.slice(0,skip);
    //     setPageData(dataskip);

    //   }
    // }, [data])
    const selectPageHandler = (selectedPage) => {
      if (selectedPage >= 1 && selectedPage <= products.length / 10 && selectedPage !== page) {
        setPage(selectedPage)
      }
    }
    
  return (
    <>
    <div className='container'>
        <h1>User Data</h1>
        <div className='mt-3 table_div'>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Price</th>
          <th>Title</th>
          <th>body</th>
        </tr>
      </thead>
      <tbody>
        {
            products.length > 0 ?
            products.slice(page*10-10,page*10).map((element,index)=>{
                return(
                    <>
                    <tr>
                        <td>{element.id}</td>
                        <td>{element.price}</td>
                        <td>{element.title}</td>
                        <td><img src={element.thumbnail} style={{width:60,height:50}}/></td>
                        </tr>
                    </>
                )

                 } ):<div>
                    <Spinner animation="border" role="status">
      <span className="visually-hidden" variant="danger">Loading...</span>
    </Spinner>
                 </div>
           
        }
        
       
      </tbody>
    </Table>
        </div>
       
       
        
    </div>
    {
        products.length>0 &&<div className='pagination'>
          <span onClick={() => selectPageHandler(page - 1)} className={page > 1 ? "" : "pagination__disable"}>◀</span>


          {[...Array(products.length / 10)].map((_, i) => {
          return <span key={i} className={page === i + 1 ? "pagination__selected" : ""} onClick={() => selectPageHandler(i + 1)} >{i + 1}</span>
        })}

<span onClick={() => selectPageHandler(page + 1)} className={page < products.length / 10 ? "" : "pagination__disable"}>▶</span>
      </div>
       }
    </>
  )
}

export default Home