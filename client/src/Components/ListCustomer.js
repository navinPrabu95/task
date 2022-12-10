import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import { Table, Button, Modal } from 'react-bootstrap'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { NavLink, useNavigate } from 'react-router-dom'




const ListCustomer = () => {

  const [cusData, setCusData] = useState([])
  const [cusId, setCusId] = useState('')
  const [show, setShow] = useState(false);

  const handleClose=()=>setShow(false)

  const navigate = useNavigate()


  useEffect(() => {
    axios.get("http://localhost:7000/all").then(result => {
      setCusData(result.data.all);
    }).catch(err => {
      console.log(err);
    })
  }, [])

  const onDeleteData = (id) => {
    axios.delete(`http://localhost:7000/delete/${id}`).then(result => {

      const filteredData = cusData.filter((v, i) => {
        return v._id !== result.data.delData._id
      })

      setCusData(filteredData)
    }).catch(err => {
      console.log(err);
    })
  }

  const handleShow = (id) => {
    setShow(true)
    setCusId(id)
  }
 
  const handleDelete = () => {
    setShow(false);
    onDeleteData(cusId)
  }


  const listAllData = useMemo(() => {
    return cusData.map((value, i) => {
      return <tr key={value._id}>
        <td>{value.firstName}</td>
        <td>{value.lastName}</td>
        <td>{value.gender}</td>
        <td>{value.mobNo}</td>
        <td>{value.email}</td>
        <td style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <NavLink to={`/edit/${value._id}`} style={{ color: '#000000' }}><FaEdit /></NavLink>
          <MdDelete onClick={() => handleShow(value._id)} />
        </td>
      </tr>
    })
  }, [cusData.length])


  return (
    <div className='list-container'>
      <div className='list-main'>
        <div className='list-title'>
          <h2>Customers</h2>
          <Button onClick={() => { navigate('/addcustomer') }}>Add Customer</Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Customer</Modal.Title>
            </Modal.Header>
            <Modal.Body>Please confirm once before delete!</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleDelete} style={{background:'red'}}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div className='list-table'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>Mobile Number</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listAllData}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default ListCustomer