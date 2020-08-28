import React, {ref, useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Popup from 'react-popup';

const GuestInput = () => {
    
        const [formData, setFormData ] = useState({
            first_name: '',
            last_name: '',
            email_address: '',
            phone_number: ''
        });

        const { first_name, last_name, email_address, phone_number } = formData;
    
       
        const onChange = e => setFormData({
            ...formData, 
            [e.target.name]: e.target.value
        });


        const onSubmit = async e => {
            e.preventDefault();
           
            const newGuest = {
                first_name,
                last_name,
                email_address,
                phone_number
            }
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                const body  = JSON.stringify(newGuest);
                const res = await axios.post('/api/guest', body, config);
                console.log(res.data);
            } catch(err) {
                console.error(err.response.data);
            }
            setFormData({
                ...formData, 
                first_name: '',
                last_name: '',
                email_address: '',
                phone_number: ''
            })
        }

        return (
            <div>
                    <h1>HooyoNetwork Guest Input</h1>
                <br />
                    <Form onSubmit={onSubmit} >
                        <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text" 
                            placeholder="Enter first name" 
                            name="first_name"
                            onChange={e => onChange(e)}
                            value={first_name}
                        >
                        </Form.Control>
                        </Form.Group>
              
                        <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter last name" 
                            name="last_name"
                            onChange={e => onChange(e)}
                            value={last_name}
                        />
                        </Form.Group>

                        <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            name="email_address"
                            onChange={e => onChange(e)}
                            value={email_address}
                        />
                        </Form.Group>

                        <Form.Group>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control 
                            type="tel" 
                            placeholder="Enter phone number" 
                            name="phone_number"
                            onChange={e => onChange(e)}
                            value={formData.phone_number}
                        />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                <br />
            </div>
            )
        }
  


export default GuestInput;