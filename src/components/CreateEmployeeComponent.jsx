import React, { useEffect, useState } from 'react';
import EmployeeService from '../services/EmployeeService';
import { useParams, useNavigate } from 'react-router-dom';

export default function CreateEmployeeComponent() {
	const [employee, setEmployee] = useState({});
	const { id } = useParams();
    let navigate = useNavigate();

	useEffect(() => {
		if (id === '_add') {
			return;
		} else {
			EmployeeService.getEmployeeById(id).then((res) => {
				setEmployee(res.data);
			});
		}
	}, []);

	function saveOrUpdateEmployee(e) {
		e.preventDefault();
		let newEmployee = {
			firstName: employee.firstName,
			lastName: employee.lastName,
			emailId: employee.emailId,
		};
		console.log('employee => ' + JSON.stringify(employee));
        console.log('ID: ', id);

		if (id === '_add') {
			EmployeeService.createEmployee(newEmployee).then((res) => {
                navigate('/employees');
			});
		} else {
            console.log("In update...")
            console.log("NewEmployee Update: ", newEmployee)
			EmployeeService.updateEmployee(newEmployee, id).then(   
				(res) => {
                    console.log("NewEmployee Update: ", newEmployee)
                    navigate('/employees');
				}
			);
		}
	}

	function changeFirstNameHandler(event) {
		setEmployee({ ...employee, firstName: event.target.value });
	};

	function changeLastNameHandler(event) {
		setEmployee({ ...employee, lastName: event.target.value });
	};

	function changeEmailHandler(event) {
		setEmployee({ ...employee, emailId: event.target.value });
	};

	function cancel() {
		navigate('/employees');
	}

	function getTitle() {
		if (id === '_add') {
			return <h3 className="text-center">Add Employee</h3>;
		} else {
			return <h3 className="text-center">Update Employee</h3>;
		}
	}

	return (
		<div>
			<br></br>
			<div className="container">
				<div className="row">
					<div className="card col-md-6 offset-md-3 offset-md-3">
						{getTitle()}
						<div className="card-body">
							<form>
								<div className="form-group">
									<label> First Name: </label>
									<input
										placeholder="First Name"
										name="firstName"
										className="form-control"
										value={employee.firstName}
										onChange={changeFirstNameHandler}
									/>
								</div>
								<div className="form-group">
									<label> Last Name: </label>
									<input
										placeholder="Last Name"
										name="lastName"
										className="form-control"
										value={employee.lastName}
										onChange={changeLastNameHandler}
									/>
								</div>
								<div className="form-group">
									<label> Email Id: </label>
									<input
										placeholder="Email Address"
										name="emailId"
										className="form-control"
										value={employee.emailId}
										onChange={changeEmailHandler}
									/>
								</div>

								<button
									className="btn btn-success"
									onClick={saveOrUpdateEmployee}
								>
									Save
								</button>
								<button
									className="btn btn-danger"
									onClick={cancel}
									style={{ marginLeft: '10px' }}
								>
									Cancel
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
