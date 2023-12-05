import React, { useState } from 'react'
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import Product from './Product';

const AddHomeModal = (props) => {
  const {openModal1,setOpenModal1,property}=props

  return (
    <>
    
    <Modal show={openModal1} size="XOXO" onClose={()=>setOpenModal1(false)} popup>
        <Modal.Header />
        <Modal.Body  >
         <Product propertyInfo={property}/>
        </Modal.Body>
      </Modal></>
  )
}

export default AddHomeModal