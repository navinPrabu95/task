import React, { useMemo, useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


const AddCustomer = () => {

    const [inputData, setInputData] = useState({})
    const [addData, setAddData] = useState([{ addressType: '', streetAddress: '', city: '', state: '', postCode: '', primary:''}])

    const navigate = useNavigate()

    const addMoreData=()=>{
        setAddData([...addData,{ addressType: '', streetAddress: '', city: '', state: '', postCode: '', primary:'' }])
    }
    
    const onSetInput=(e,i)=>{
      if(e.target.value==''){
        toast.error("please Enter all fields");
      }else{
        const allData = [...addData]
        allData[i][e.target.name]=e.target.value
        setAddData(allData)
      }
    }

    const submitAllData=()=>{

        const regEx = /^([+]\d{2}[ ])?\d{10}$/

        if(!regEx.test(String(inputData.mobNo))){
            toast.error("please enter valid mobile number");
        }else{

            const regPost = /^\d{4}$/

            const pCode = addData.map(v=>{
                return v.postCode
            })

            if(!regPost.test(String(pCode))){
                toast.error("Post Code contain only 4 digits");
            }else{
                axios.post("http://localhost:7000/add",{
                    firstName:inputData.firstName,
                    lastName:inputData.lastName,
                    gender:inputData.gender,
                    mobNo:inputData.mobNo,
                    email:inputData.email,
                    address:addData
                }).then(result=>{
                    console.log("result--->",result.data);
                    toast.success(result.data.success)
                    navigate('/listcustomer')
                }).catch(err=>{
                    console.log("err--->",err.data);
                })
            }
        }
    }
    const listData = useMemo(() => {
        return addData.map((v, i) => {
            return <div key={i}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Address Type</Form.Label>
                        <Form.Select name='addressType' onChange={(e)=>onSetInput(e,i)} required>
                            <option value='Buliding Address'>Buliding Address</option>
                            <option value='Shipping Address'>Shipping Address</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Street Address</Form.Label>
                        <Form.Control placeholder="1234 Main St"  name='streetAddress' onChange={(e)=>onSetInput(e,i)} required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control placeholder="Enter City" name='city' onChange={(e)=>onSetInput(e,i)} required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>State</Form.Label>
                        <Form.Control placeholder="Enter state"  name='state' onChange={(e)=>onSetInput(e,i)} required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label >Post Code</Form.Label>
                        <Form.Control placeholder="Enter code"  name='postCode' onChange={(e)=>onSetInput(e,i)} required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Primary</Form.Label>
                        <Form.Check
                            type="radio"
                            label="Primary"
                            name="primary"
                            id="formHorizontalRadios1"
                            value='primary'
                            onChange={(e)=>onSetInput(e,i)}
                        />
                    </Form.Group>
                </Row>
                {addData.length-1===i&&<Button variant="primary" onClick={addMoreData}>
                    Add More
                </Button>}     
            </div>
        })
    }, [addData.length])


    return (
        <div className='cus-container'>
            <Form>
                <div className='cus-main'>
                    <ToastContainer/>
                    <div className='ad-ed-customer'>
                        <div><h2>Add/Edit Customer</h2></div>
                        <div>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter first name"  name='firstName' required
                                    onChange={(e)=>{setInputData({...inputData,[e.target.name]:e.target.value})}}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter last name" name='lastName' required 
                                     onChange={(e)=>{setInputData({...inputData,[e.target.name]:e.target.value})}}
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Select defaultValue="Choose..." name='gender'  required
                                    onChange={(e)=>{setInputData({...inputData,[e.target.name]:e.target.value})}}>
                                        <option value='Choose...'>Choose...</option>
                                        <option value='Male'>Male</option>
                                        <option value='Female'>Female</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Mob No</Form.Label>
                                    <Form.Control type="number" placeholder="Mobile Number"  name='mobNo' required
                                    onChange={(e)=>{setInputData({...inputData,[e.target.name]:e.target.value})}}                                    
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" name='email' required
                                    onChange={(e)=>{setInputData({...inputData,[e.target.name]:e.target.value})}}                                    
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridPassword">
                                </Form.Group>
                            </Row>
                        </div>
                    </div>
                    <div className='ad-cus-address'>
                        <div><h2>ADDRESS</h2></div>
                        {listData}
                    </div>
                    <div className='sub-btn'>
                        <Button variant="primary" style={{background:'red'}}  onClick={()=>{window.location.reload()}}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={submitAllData} style={{background:'green'}}>
                            Save
                        </Button>
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default AddCustomer