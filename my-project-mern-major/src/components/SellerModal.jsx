import React ,{useState}from 'react'
import { useAlert } from 'react-alert'
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
const SellerModal = (props) => {
    const {setOpenModal,openModal}=props
    const alert = useAlert()
    
    const [number, setNumber] = useState('');
    const [enable,setEnable]=useState(true)

    //check box handle kia hai
    const handleCheck=(e)=>{
      const checked = e.target.checked;
      if(checked)
      {
        setEnable(false)
      }else{
        setEnable(true)
      }
      

    }

    //number liya hai user se
    const handleChnage = (e) => { 
    setNumber(e.target.value);  
    }

    //modal ko submit kia
    const submitNumber=()=>{
        setOpenModal(false);
        alert.show('Successfully Send')
    }
  return (
   <>
   <Modal show={openModal} size="md" onClose={()=>setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Please Give Us Your Number</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="Phone Number" value="Your Number" />
              </div>
              <TextInput
                id="phonenumber"
                placeholder="+91 ..."
                value={number}
                onChange={handleChnage}
                required
              />
            </div>
           
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
               <Checkbox id="remember"  onClick={(e)=>handleCheck(e)}/>
                <Label htmlFor="remember"> Remember Me</Label>
              </div>
              
            </div>
            <div className="w-full mb-2">
              <Button onClick={submitNumber} disabled={enable}> Submit</Button>
            </div>

          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default SellerModal