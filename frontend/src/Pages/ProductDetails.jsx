import React from 'react'
import useParam from 'react-router-dom'

const ProductDetails = () => {

    const {id} = useParam() ;
  return (
    <div>
      ak single products {id}
    </div>
  )
}

export default ProductDetails
