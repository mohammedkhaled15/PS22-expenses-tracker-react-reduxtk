import React from 'react'
import Form from "react-bootstrap/Form"
import Button from 'react-bootstrap/esm/Button'
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saving } from './redux/recordSlice';


const NewTransModal = ({ setShowNew }) => {

    const [desc, setDesc] = useState("")
    const [amount, setAmount] = useState(0)
    const [sign, setSign] = useState("positive")

    const dispatch = useDispatch()
    const records = useSelector(state => state.records)

    const handleSaving = (e) => {
        e.preventDefault()
        dispatch(saving({
            desc,
            amount: sign === "positive" ? +amount : -Math.abs(amount),
            sign,
        }))
    }
    console.log("saving", records)

    const handleClose = () => {
        setShowNew(false)
    }
    return (
        <div className='new-modal  w-100 position-absolute h-100 start-50 top-50 translate-middle' style={{ backgroundColor: "rgba(192, 192, 192,0.8)" }}>
            <div className=' position-absolute start-50 top-50 translate-middle rounded-3 p-4 bg-secondary bg-gradient bg-opacity-75'>
                <h3>Add New Transaction</h3>
                <div className="hr-divider"></div>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Details of your transaction:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter details"
                            value={desc}
                            onChange={e => { setDesc(e.target.value) }}
                        />
                        <Form.Text className="text-muted">
                            write whatever you want
                        </Form.Text>
                    </Form.Group>
                    <InputGroup style={{ justifyContent: "space-evenly" }}>
                        <Form.Check
                            inline
                            label="Income"
                            name="group1"
                            type="radio"
                            id={`inline-radio-1`}
                            onClick={() => setSign("positive")}
                        />
                        <Form.Check
                            inline
                            label="Expense"
                            name="group1"
                            type="radio"
                            id={`inline-radio-2`}
                            onClick={() => setSign("negative")}
                        />
                    </InputGroup>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Amount"
                            min={1}
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                        />
                    </Form.Group>
                    <div className='d-flex justify-content-evenly'>
                        <Button variant="primary" type="submit" onClick={(e) => handleSaving(e)}>
                            Add
                        </Button>
                        <Button variant="danger" type="button" onClick={handleClose}>
                            Close
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default NewTransModal