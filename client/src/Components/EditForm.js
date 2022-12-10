import axios from 'axios'
import React, { useEffect, useState, useMemo } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { Form, Row, Col, Button } from 'react-bootstrap';


const EditForm = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [cusData, setCusData] = useState()
    const [inputData, setInputData] = useState({})
    const [addData, setAddData] = useState([{ addressType: '', streetAddress: '', city: '', state: '', postCode: '', primary: '' }])

    useEffect(() => {
        axios.get(`http://localhost:7000/customer/${id}`).then(res => {
            setCusData(res.data.customer)
        }).catch(err => {
            console.log(err);
        })
    }, []) 

    const addMoreData=()=>{
        setAddData([...addData,{ addressType: '', streetAddress: '', city: '', state: '', postCode: '', primary: '' }])
    }
    
    const onSetInput=(e,i)=>{
      if(e.target.value==''){
        console.log("please Enter all fields");
      }else{
        const allData = [...addData]
        allData[i][e.target.name]=e.target.value
        setAddData(allData)
      }
    }

   
    const submitAllData=()=>{

        axios.put(`http://localhost:7000/update/${id}`,{
            firstName:inputData.firstName,
            lastName:inputData.lastName,
            gender:inputData.gender,
            mobNo:inputData.mobNo,
            email:inputData.email,
        }).then(result=>{
            console.log("result--->",result.data);
            navigate('/listcustomer')
        }).catch(err=>{
            console.log("err--->",err.data);
        })
    }
    
   
    const listData = useMemo(() => {
        return addData.map((v, i) => {
            return <div key={i}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Address Type</Form.Label>
                        <Form.Select name='addressType' onChange={(e)=>onSetInput(e,i)}>
                            <option value='Buliding Address'>Buliding Address</option>
                            <option value='Shipping Address'>Shipping Address</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Street Address</Form.Label>
                        <Form.Control placeholder="1234 Main St"  name='streetAddress' onChange={(e)=>onSetInput(e,i)}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control placeholder="Enter City" name='city' onChange={(e)=>onSetInput(e,i)}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>State</Form.Label>
                        <Form.Control placeholder="Enter state"  name='state' onChange={(e)=>onSetInput(e,i)}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label >Post Code</Form.Label>
                        <Form.Control placeholder="Enter code"  name='postCode' onChange={(e)=>onSetInput(e,i)}/>
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
        <div>
            <Form>
                <div className='cus-main'>
                    <div className='ad-ed-customer'>
                        <div><h2>Add/Edit Customer</h2></div>
                        <div>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter first name"  name='firstName' defaultValue={cusData.firstName}
                                    onChange={(e)=>{setInputData({...inputData,[e.target.name]:e.target.value})}}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter last name" name='lastName' defaultValue={cusData.lastName}
                                     onChange={(e)=>{setInputData({...inputData,[e.target.name]:e.target.value})}}
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Select  name='gender' defaultValue={cusData.gender} 
                                    onChange={(e)=>{setInputData({...inputData,[e.target.name]:e.target.value})}}>
                                        <option value='Male'>Male</option>
                                        <option value='Female'>Female</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Mob No</Form.Label>
                                    <Form.Control type="number" placeholder="Mobile Number"  name='mobNo' defaultValue={cusData.mobNo}
                                    onChange={(e)=>{setInputData({...inputData,[e.target.name]:e.target.value})}}                                    
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" name='email' defaultValue={cusData.email}
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
                        <Button variant="primary">
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={submitAllData}>
                            Save
                        </Button>
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default EditForm