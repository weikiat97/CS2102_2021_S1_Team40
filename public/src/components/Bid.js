import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import 'date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


//also need to somehow pass over the username from caretakers
export default function Bid(props) {
    const { open, onClose } = props;
    const { startDate, setStartDate } = useState(new Date());
    const { endDate, setEndDate } = useState(startDate);
    // const handleStartDateChange = (date) => {
    //     setStartDate(date);
    // };
    // const handleEndDateChange = (date) => {
    //     setEndDate(date);
    // };

    const { petType, setPetType } = useState("");
    // const handlePetTypeChange = (event) => {
    //     setPetType(event.target.value);
    // };

    const { transferType, setTransferType } = useState("");
    // const handleTransferTypeChange = (event) => {
    //     setTransferType(event.target.value);
    // };

    const { price, setPrice } = useState("")
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Bid page</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter these information before bidding
                </DialogContentText>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Select date"
                        format="MM/dd/yyyy"
                        value={startDate}
                        onChange={(date) => setStartDate(date)}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Select start time"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        KeyboardButtonProps={{
                            'aria-label': 'change start time',
                        }}
                    />
                    <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Select end time"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        KeyboardButtonProps={{
                            'aria-label': 'change end time',
                        }}
                    />
                </MuiPickersUtilsProvider>
                <FormControl>
                    <InputLabel id="select-pet-type">Select pet type</InputLabel>
                    <Select
                        labelId="select-pet-type"
                        id="select-pet-type"
                        value={petType}
                        onChange={(e) => setPetType(e.target.value)}
                    >
                        <MenuItem value={"Dog"}>Dog</MenuItem>
                        <MenuItem value={"Cat"}>Cat</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    autoFocus
                    label="Price"
                    type="text"
                    fullWidth
                    onChange={(e) => setPrice(e.target.value)}
                />
                <FormControl>
                    <InputLabel id="select-transfer-type">Select transfer type</InputLabel>
                    <Select
                        labelId="select-transfer-type"
                        id="select-transfer-type"
                        value={transferType}
                        onChange={(e) => setTransferType(e.target.value)}
                    >
                        <MenuItem value={"Delivered by you"}>Delivered by you</MenuItem>
                        <MenuItem value={"Caretaker pick up"}>Caretaker pick up</MenuItem>
                        <MenuItem value={"Transfer through PCS building"}>Transfer through PCS building</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}