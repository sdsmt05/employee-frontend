import React, { useEffect, useState } from 'react';
import EmployeeService from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

export default function ListEmployeeComponent() {
	const [employees, setEmployees] = useState([]);

	let navigate = useNavigate();

	useEffect(() => {
		EmployeeService.getEmployees().then((res) => {
			const data = res.data;
			setEmployees(data);
		});
	}, []);

	function deleteEmployee(id) {
		EmployeeService.deleteEmployee(id).then((res) => {
			setEmployees(employees.filter((employee) => employee.id !== id));
		});
	}
	function viewEmployee(id) {
		navigate(`/view-employee/${id}`);
	}
	function editEmployee(id) {
		navigate(`/add-employee/${id}`);
	}

	function addEmployee() {
		navigate('/add-employee/_add');
	}

	return (
		<>
		<div>
			<h2 className="text-center">Employees List</h2>
			<div className="row">
				<button className="btn btn-primary" onClick={addEmployee}>
					{' '}
					Add Employee
				</button>
			</div>
			<br></br>
			<div className="row">
				<table className="table table-striped table-bordered">
					<thead>
						<tr>
							<th> Employee First Name</th>
							<th> Employee Last Name</th>
							<th> Employee Email Id</th>
							<th> Actions</th>
						</tr>
					</thead>
					<tbody>
						{employees?.map((employee) => (
							<tr key={employee.id}>
								<td> {employee.firstName} </td>
								<td> {employee.lastName}</td>
								<td> {employee.emailId}</td>
								<td>
									<button
										onClick={() => editEmployee(employee.id)}
										className="btn btn-info"
									>
										Update{' '}
									</button>
									<button
										style={{ marginLeft: '10px' }}
										onClick={() => deleteEmployee(employee.id)}
										className="btn btn-danger"
									>
										Delete{' '}
									</button>
									<button
										style={{ marginLeft: '10px' }}
										onClick={() => viewEmployee(employee.id)}
										className="btn btn-info"
									>
										View{' '}
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
		</>
	);
}
