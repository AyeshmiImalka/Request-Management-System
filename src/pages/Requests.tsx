import React, { useEffect, useState } from 'react';
import './Requests.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faFilter, faDownload, faEye } from '@fortawesome/free-solid-svg-icons';
import Pagination from '@mui/material/Pagination';
import Chip from '@mui/material/Chip';
import NewRequestDialog from './NewRequestDialog';
import { fetchRequests, createRequest } from '../api/requestsApi';

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

const Requests: React.FC = () => {
  const [requestsData, setRequestsData] = useState<Request[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<Request[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const dummyData: Request[] = [
          { slNo: 1, requestId: 'REQ001', createdOn: '2023-10-01', location: 'New York', service: 'IT Support', status: 'NEW', department: 'IT', requestedBy: 'Alice', assignedTo: 'John', priority: 'High' },
          { slNo: 2, requestId: 'REQ002', createdOn: '2023-10-02', location: 'Boston', service: 'Network Issue', status: 'IN_PROGRESS', department: 'Patient Experience', requestedBy: 'Bob', assignedTo: 'Sarah', priority: 'Medium' },
          { slNo: 3, requestId: 'REQ003', createdOn: '2023-10-03', location: 'Chicago', service: 'Software Installation', status: 'COMPLETED', department: 'IT', requestedBy: 'Charlie', assignedTo: 'Mike', priority: 'Low' },
          { slNo: 4, requestId: 'REQ004', createdOn: '2023-10-04', location: 'Dallas', service: 'Hardware Maintenance', status: 'NEW', department: 'IT', requestedBy: 'Dave', assignedTo: 'Anna', priority: 'High' },
          { slNo: 5, requestId: 'REQ005', createdOn: '2023-10-05', location: 'Los Angeles', service: 'Billing Inquiry', status: 'IN_PROGRESS', department: 'Patient Experience', requestedBy: 'Eva', assignedTo: 'Chris', priority: 'Medium' },
          { slNo: 6, requestId: 'REQ006', createdOn: '2023-10-06', location: 'Seattle', service: 'Software Bug Fix', status: 'NEW', department: 'IT', requestedBy: 'Frank', assignedTo: 'Lisa', priority: 'Low' },
          { slNo: 7, requestId: 'REQ007', createdOn: '2023-10-07', location: 'Miami', service: 'System Upgrade', status: 'COMPLETED', department: 'IT', requestedBy: 'Grace', assignedTo: 'Paul', priority: 'High' },
          { slNo: 8, requestId: 'REQ008', createdOn: '2023-10-08', location: 'San Francisco', service: 'Account Setup', status: 'IN_PROGRESS', department: 'Patient Experience', requestedBy: 'Henry', assignedTo: 'Laura', priority: 'Medium' },
          { slNo: 9, requestId: 'REQ009', createdOn: '2023-10-09', location: 'Phoenix', service: 'Security Patch', status: 'NEW', department: 'IT', requestedBy: 'Isabella', assignedTo: 'Jake', priority: 'Low' },
          { slNo: 10, requestId: 'REQ010', createdOn: '2023-10-10', location: 'Denver', service: 'System Training', status: 'COMPLETED', department: 'Patient Experience', requestedBy: 'Jack', assignedTo: 'Sophia', priority: 'High' },
        ];

        setRequestsData(dummyData);
        setFilteredRequests(dummyData);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    loadRequests();
  }, []);

  useEffect(() => {
    filterRequests();
  }, [searchTerm, statusFilter, departmentFilter, dateFilter, requestsData]);

  const filterRequests = () => {
    let filteredData = requestsData;

    if (searchTerm) {
      filteredData = filteredData.filter(request =>
        request.requestId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filteredData = filteredData.filter(request => request.status === statusFilter);
    }

    if (departmentFilter) {
      filteredData = filteredData.filter(request => request.department === departmentFilter);
    }

    if (dateFilter) {
      filteredData = filteredData.filter(request => request.createdOn === dateFilter);
    }

    setFilteredRequests(filteredData);
  };

  const getStatusChipColor = (status: string) => {
    switch (status) {
      case 'NEW':
        return 'primary';
      case 'IN_PROGRESS':
        return 'warning';
      case 'COMPLETED':
        return 'success';
      default:
        return 'default';
    }
  };

  const getPriorityChipColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'error';
      case 'Medium':
        return 'warning';
      case 'Low':
        return 'success';
      default:
        return 'default';
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value);
  };

  const handleDepartmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDepartmentFilter(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateFilter(event.target.value);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleFormSubmit = async (formData: FormData) => {
    try {
      const newRequest = await createRequest(formData);
      setRequestsData([...requestsData, newRequest]);
      setDialogOpen(false);
      alert('Request successfully submitted!');
    } catch (error) {
      console.error('Error creating request:', error);
      alert('Failed to submit the request.');
    }
  };

  return (
    <div className="requests-page">
      <div className="requests-header">
        <h1>Requests</h1>
        <button className="new-request-button" onClick={handleDialogOpen}>
          <FontAwesomeIcon icon={faPlus} /> New Request
        </button>
      </div>

      {/* Status Circles (aligned to the right) */}
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
        <input type="text" placeholder="Search by request ID" value={searchTerm} onChange={handleSearch} />
        <input type="date" value={dateFilter} onChange={handleDateChange} />
        <select value={statusFilter} onChange={handleStatusChange}>
          <option value="">Filter by Status</option>
          <option value="NEW">New</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
        <select value={departmentFilter} onChange={handleDepartmentChange}>
          <option value="">Filter by Department</option>
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
            <th>Created On</th>
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
          {filteredRequests.map((request) => (
            <tr key={request.requestId}>
              <td>{request.slNo}</td>
              <td>{request.requestId}</td>
              <td>{request.createdOn}</td>
              <td>{request.location}</td>
              <td>{request.service}</td>
              <td>
                <Chip label={request.status} color={getStatusChipColor(request.status)} />
              </td>
              <td>{request.department}</td>
              <td>{request.requestedBy}</td>
              <td>{request.assignedTo}</td>
              <td>
                <Chip label={request.priority} color={getPriorityChipColor(request.priority)} />
              </td>
              <td>
                <button className="view-button">
                  <FontAwesomeIcon icon={faEye} /> View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination count={10} shape="rounded" className="pagination" />
      <NewRequestDialog open={dialogOpen} onClose={handleDialogClose} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default Requests;
