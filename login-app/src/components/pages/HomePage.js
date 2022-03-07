import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

export default function HomePage() {

    if (!window.localStorage.getItem("token")) {
        return <Redirect to="/" />;
    } else {
        const resp = JSON.parse(window.localStorage.getItem("token"));

        if (resp.length == 1) {
            return (
                <div className="container">
                    <div className="row mt-2 mb-3">
                        <div class="col-6"><h4>Profile</h4></div>
                        <div class="col-6 text-right"><Link to="/">
                            <button className="btn btn-secondary" onClick={e => window.localStorage.removeItem("token")}>Log out</button>
                        </Link></div></div>
                    <div class="text-center">
                        <label>Name: </label>  <span>{resp[0].name}</span>
                        <br></br>
                        <label>Email: </label>  <span>{resp[0].email}</span>
                        <br></br>
                        <label>Role: </label>  <span>{resp[0].role}</span>
                        <br></br>
                    </div>
                </div>
            )
        } else {
            const resp = JSON.parse(window.localStorage.getItem("token"));
            function renderTableHeader() {
                let header = Object.keys(resp[0])
                return header.map((key, index) => {
                    if (key !== 'id') {
                        if (key !== 'password') {
                            return <th key={index}>{key.toUpperCase()}</th>
                        }
                    }
                })
            }
            function renderTableData() {
                return resp.map((emp, index) => {
                    const { id, name, email, role } = emp
                    return (
                        <tr key={id}>
                            <td>{name}</td>
                            <td>{email}</td>
                            <td>{role}</td>
                        </tr>
                    )
                })
            }
            return (
                <div className='container'>
                    <div className="row mt-2 mb-3">
                        <div class="col-6"><h4>User Details</h4></div>
                        <div class="col-6 text-right"><Link to="/">
                            <button className="btn btn-secondary" onClick={e => window.localStorage.removeItem("token")}>Log out</button>
                        </Link></div>
                    </div>
                    <Table striped bordered hover>
                        <tbody>
                            <tr>{renderTableHeader()}</tr>
                            {renderTableData()}
                        </tbody>
                    </Table>
                </div>

            )
        }
    }

}