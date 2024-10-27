import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Typography,
  Grid,
  Snackbar, // Import Snackbar
  Alert, // Import Alert for Snackbar
} from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { SelectChangeEvent } from '@mui/material/Select';

interface NewRequestDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
}

const NewRequestDialog: React.FC<NewRequestDialogProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [formValues, setFormValues] = useState({
    floor: '',
    roomUnit: '',
    block: '',
    guestName: '',
    phoneNumber: '',
    service: '',
    department: '',
    priority: '',
    file: null as File | null,
  });

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      file: event.target.files ? event.target.files[0] : null,
    });
  };

  const handleFormSubmit = () => {
    const formData = new FormData();
    Object.entries(formValues).forEach(([key, value]) => {
      if (value !== null) {
        formData.append(key, value as string | Blob);
      }
    });
    onSubmit(formData);
    setSnackbarOpen(true); // Open the Snackbar on form submission
    onClose();
  };

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Request</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {/* Floor and Room / Unit fields in one row */}
          <Grid item xs={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Floor *</InputLabel>
              <Select name="floor" value={formValues.floor} onChange={handleSelectChange}>
                <MenuItem value="Ground Floor">Ground Floor</MenuItem>
                <MenuItem value="First Floor">First Floor</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Room / Unit *</InputLabel>
              <Select name="roomUnit" value={formValues.roomUnit} onChange={handleSelectChange}>
                <MenuItem value="Room 101">Room 101</MenuItem>
                <MenuItem value="Unit 202">Unit 202</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Block *</InputLabel>
              <Select name="block" value={formValues.block} onChange={handleSelectChange}>
                <MenuItem value="Block A">Block A</MenuItem>
                <MenuItem value="Block B">Block B</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <TextField
          fullWidth
          margin="normal"
          label="Guest Name"
          name="guestName"
          value={formValues.guestName}
          onChange={handleTextFieldChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Phone Number"
          name="phoneNumber"
          type="tel"
          value={formValues.phoneNumber}
          onChange={handleTextFieldChange}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Service</InputLabel>
          <Select name="service" value={formValues.service} onChange={handleSelectChange}>
            <MenuItem value="Service A">Service A</MenuItem>
            <MenuItem value="Service B">Service B</MenuItem>
          </Select>
        </FormControl>

        {/* Department and Priority fields in one row */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Department</InputLabel>
              <Select name="department" value={formValues.department} onChange={handleSelectChange}>
                <MenuItem value="Patient Experience">Patient Experience</MenuItem>
                <MenuItem value="IT">IT</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Priority</InputLabel>
              <Select name="priority" value={formValues.priority} onChange={handleSelectChange}>
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          mt={2}
          p={2}
          border="1px dashed gray"
          borderRadius="8px"
          textAlign="center"
          sx={{ cursor: 'pointer' }}
        >
          <input
            type="file"
            accept="*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="upload-file"
          />
          <label htmlFor="upload-file">
            <CloudUploadIcon fontSize="large" color="primary" />
            <Typography variant="body2" color="textSecondary">
              Browse or drag and drop the file.
            </Typography>
          </label>
          {formValues.file && (
            <Typography variant="caption" mt={1}>
              {formValues.file.name}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleFormSubmit} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>

      {/* Snackbar for success alert */}
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Successfully submitted!
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default NewRequestDialog;
