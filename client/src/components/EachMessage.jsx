import React, { Component, useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom'
import {
    Button,
    CircularProgress,
    Grid,
    IconButton,
    Input,
    Menu,
    MenuItem,
    Typography,
    useTheme,
    TextField
} from "@mui/material";
export const EachMessage = ({ _id, type, msg,senderId }) => {
    // console.log(type%2==0)
    // console.log(type)
    return (
        <>
            {_id === senderId ?
                <div
                    style={{
                        display: "flex",
                        flexDirection: 'row',
                        justifyContent: 'end'
                    }}
                >
                    <Typography
                        sx={{
                            clear: "both",
                            padding: "10px",
                            boxSizing: "border-box",
                            wordWrap: "break-word",
                            marginTop: "10px",
                            backgroundColor: "#3288cd",
                            color: "white",
                            minWidth: "200px",
                            maxWidth: "400px",
                            borderRadius: "10px",
                        }}
                    >
                        {msg}

                    </Typography>
                </div>
                :
                <div
                    style={{
                        display: "flex",
                        flexDirection: 'row',
                        maxWidth: "50%"
                    }}
                >
                    <Typography
                        sx={{
                            clear: "both",
                            padding: "10px",
                            boxSizing: "border-box",
                            wordWrap: "break-word",
                            marginTop: "10px",
                            backgroundColor: "#444ebb",
                            color: "white",
                            minWidth: "200px",
                            maxWidth: "400px",
                            borderRadius: "10px",
                        }}
                    >
                        {msg}
                    </Typography>
                </div>
            }
        </>

    )
}
export default EachMessage