import React, { useState } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import {Bid} from "../components/Bid";


export default function Caretakers() {
    const [bidPageOpen, setBidPageOpen] = useState(false);
    return (
        <div>
            <h1>List of Caretakers that match your criteria</h1>
            <TableContainer component={Paper}>
                <Table stickyHeader aria-label="caretakers-table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Name</TableCell>
                            <TableCell align='center'>Daily Price</TableCell>
                            <TableCell align='center'>Available times</TableCell>
                            <TableCell align='center'>Bid?</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableCell align='center'>Person</TableCell>
                        <TableCell align='center'>Cat:$30, Dog:$40</TableCell>
                        <TableCell align='center'>1/1/20 - 1/6/20</TableCell>
                        <TableCell align='center'>
                            <Button variant="contained" onClick={() => setBidPageOpen(true)}>
                                Bid
                            </Button>
                        </TableCell>
                    </TableBody>
                </Table>
            </TableContainer>
            <Bid open={bidPageOpen} onClose={() => setBidPageOpen(false)} /> 
        </div>
    );
}