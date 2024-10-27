import React, { useEffect, useState } from 'react';
import './Requests.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faFilter, faDownload, faEye } from '@fortawesome/free-solid-svg-icons';
import Pagination from '@mui/material/Pagination';
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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const data = await fetchRequests();
        setRequestsData(data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    loadRequests();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value);
  };

  const handleDepartmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDepartmentFilter(event.target.value);
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

      <div className="search-filters">
        <input type="text" placeholder="Search by request ID" value={searchTerm} onChange={handleSearch} />
        <input type="date" />
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
          {requestsData.map((request) => (
            <tr key={request.requestId}>
              <td>{request.slNo}</td>
              <td>{request.requestId}</td>
              <td>{request.createdOn}</td>
              <td>{request.location}</td>
              <td>{request.service}</td>
              <td>{request.status}</td>
              <td>{request.department}</td>
              <td>{request.requestedBy}</td>
              <td>{request.assignedTo}</td>
              <td>{request.priority}</td>
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
