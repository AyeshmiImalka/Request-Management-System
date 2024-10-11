import React, { useState } from 'react';
import './Requests.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faFilter, faDownload, faEye } from '@fortawesome/free-solid-svg-icons';
import Pagination from '@mui/material/Pagination';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

interface Request {
  slNo: number;
  requestId: string;
  createdOn: string;
  location: string;
  service: string;
  status: string;
  department: string;
  requestedBy: string;
  assignedTo: string;
  priority: string;
}

const Requests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [open, setOpen] = useState(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value);
  };

  const handleDepartmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDepartmentFilter(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const requestsData: Request[] = [
    // Sample data (replace with actual data)
    {
      slNo: 1,
      requestId: 'REQ-001',
      createdOn: '2024-10-01',
      location: 'Room 101',
      service: 'Service A',
      status: 'NEW',
      department: 'Patient Experience',
      requestedBy: 'John Doe',
      assignedTo: 'Jane Smith',
      priority: 'HIGH',
    },
    // Add more requests as needed
  ];

  return (
    <div className="requests-page">
      <div className="requests-header">
        <h1>Requests</h1>
        <button className="new-request-button" onClick={handleClickOpen}>
          <FontAwesomeIcon icon={faPlus} /> New Request
        </button>
      </div>

      <div className="status-circles-container">
        <div className="circle new-requests">
          <span className="count">10</span>
          <span className="label">New Requests</span>
        </div>
        <div className="circle delayed-requests">
          <span className="count">05</span>
          <span className="label">Delayed Requests</span>
        </div>
        <div className="circle escalated-requests">
          <span className="count">02</span>
          <span className="label">Escalated Requests</span>
        </div>
        <div className="circle on-hold-requests">
          <span className="count">00</span>
          <span className="label">On Hold Requests</span>
        </div>
      </div>

      <div className="search-filters">
        <input
          type="text"
          placeholder="Search by request ID"
          value={searchTerm}
          onChange={handleSearch}
        />
        <input
          type="date"
          placeholder="Feb 1, 2024 - Feb 10,2024"
        />
        <select onChange={handleStatusChange}>
          <option value="">Status</option>
          <option value="NEW">New</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
        <select onChange={handleDepartmentChange}>
          <option value="">Department</option>
          <option value="Patient Experience">Patient Experience</option>
          <option value="IT">IT</option>
        </select>
        <button className="filter-button">
          <FontAwesomeIcon icon={faFilter} />
        </button>
        <button className="download-button">
          <FontAwesomeIcon icon={faDownload} />
        </button>
      </div>

      <table className="requests-table">
        <thead>
          <tr>
            <th>SL No</th>
            <th>Request ID</th>
            <th>Created on</th>
            <th>Location</th>
            <th>Service</th>
            <th>Status</th>
            <th>Department</th>
            <th>Requested By</th>
            <th>Assigned To</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requestsData.map((request) => (
            <tr key={request.slNo}>
              <td>{request.slNo}</td>
              <td>{request.requestId}</td>
              <td>{request.createdOn}</td>
              <td>{request.location}</td>
              <td>{request.service}</td>
              <td><span className={`badge ${request.status.toLowerCase()}`}>{request.status}</span></td>
              <td>{request.department}</td>
              <td>{request.requestedBy}</td>
              <td>{request.assignedTo}</td>
              <td><span className={`badge ${request.priority.toLowerCase()}`}>{request.priority}</span></td>
              <td><FontAwesomeIcon icon={faEye} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <Pagination count={5} variant="outlined" shape="rounded" />
      </div>

      <Dialog open={open} onClose={handleClose} sx={{ '& .MuiDialogContent-root': { minWidth: '400px', minHeight: '500px' } }}>
        <DialogTitle>Create New Request</DialogTitle>
        <DialogContent>
          <form className="new-request-form">
            <InputLabel id="request-title-label">Request Title</InputLabel>
            <TextField
              autoFocus
              margin="dense"
              id="request-title"
              label="Request Title"
              type="text"
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }} // Add spacing between inputs
            />
            <InputLabel id="description-label">Description</InputLabel>
            <TextField
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              sx={{ mb: 2 }} // Add spacing between inputs
            />
            <InputLabel id="department-label">Department</InputLabel>
            <Select
              labelId="department-label"
              id="department"
              label="Department"
              fullWidth
              sx={{ mb: 2 }} // Add spacing between inputs
            >
              <MenuItem value="Patient Experience">Patient Experience</MenuItem>
              <MenuItem value="IT">IT</MenuItem>
            </Select>
            <InputLabel id="priority-label">Priority</InputLabel>
            <Select
              labelId="priority-label"
              id="priority"
              label="Priority"
              fullWidth
              sx={{ mb: 2 }} // Add spacing between inputs
            >
              <MenuItem value="LOW">Low</MenuItem>
              <MenuItem value="MEDIUM">Medium</MenuItem>
              <MenuItem value="HIGH">High</MenuItem>
            </Select>
            <InputLabel id="floor-label">Floor</InputLabel>
            <Select
              labelId="floor-label"
              id="floor"
              label="Floor"
              fullWidth
              sx={{ mb: 2 }} // Add spacing between inputs
            >
              <MenuItem value="Ground Floor">Ground Floor</MenuItem>
              <MenuItem value="First Floor">First Floor</MenuItem>
            </Select>
            <InputLabel id="room/unit-label">Room/Unit</InputLabel>
            <Select
              labelId="room/unit-label"
              id="room/unit"
              label="Room/Unit"
              fullWidth
              sx={{ mb: 2 }} // Add spacing between inputs
            >
              <MenuItem value="Room 101">Room 101</MenuItem>
              <MenuItem value="Unit 202">Unit 202</MenuItem>
            </Select>
            <InputLabel id="block-label">Block</InputLabel>
            <Select
              labelId="block-label"
              id="block"
              label="Block"
              fullWidth
              sx={{ mb: 2 }} // Add spacing between inputs
            >
              <MenuItem value="Block A">Block A</MenuItem>
              <MenuItem value="Block B">Block B</MenuItem>
            </Select>
            <InputLabel id="guest-name-label">Guest Name</InputLabel>
            <TextField
              margin="dense"
              id="guest-name"
              label="Guest Name"
              type="text"
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }} // Add spacing between inputs
            />
            <InputLabel id="phone-number-label">Phone Number</InputLabel>
            <TextField
              margin="dense"
              id="phone-number"
              label="Phone Number"
              type="tel"
              fullWidth
              variant="outlined"
            />
          </form>
        </DialogContent>
        <DialogActions>
  <Button className="cancel-button" onClick={handleClose}>Cancel</Button>
  <Button className="submit-button" onClick={handleClose}>Submit</Button>
</DialogActions>

      </Dialog>
    </div>
  );
};

export default Requests;
