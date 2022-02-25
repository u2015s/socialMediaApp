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
import format from "date-fns/format";

import { Box } from "@mui/system";
import React, { useEffect, useState, useRef } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from '@mui/icons-material/Send';
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { EachMessage } from "../components/EachMessage.jsx";
import axios from "axios";
import { useLocation } from "react-router-dom";

import { io } from "socket.io-client";
export default function MessageDetails() {
  const location = useLocation()
  const { con } = location.state
  // const [commentText, setCommentText] = useState("");
  const [currentChat, setCurrentChat] = useState(con);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const theme = useTheme();
  const { id } = useParams();
  const history = useHistory();
  const socket = useRef();
  const scrollRef = useRef();

  // console.log(con)
  const dispatch = useDispatch();
  // const { status, comments, commentStatus, postDetails } = useSelector(
  //   (state) => state.post
  // );
  // var socket

  const { _id } = JSON.parse(localStorage.getItem("login"));

  useEffect(() => {
    socket.current = io(axios.defaults.baseURL);
    socket.current.on("getMessage", (data) => {
      console.log(data)
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, [arrivalMessage]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", _id);
    socket.current.on("getUsers", (users) => {
      // console.log(users)
      // setOnlineUsers(
      //   user.followings.filter((f) => users.some((u) => u.userId === f))
      // );
    });
  }, []);

  // useEffect(() => {
  //   dispatch(getPostDetails(id));
  //   dispatch(getComments(id));
  // }, [dispatch, id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        // console.log(currentChat?._id)
        const res = await axios.get("/api/messages/" + currentChat?._id);

        console.log(res.data)
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async () => {
    // e.preventDefault();
    const message = {
      sender: _id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== _id
    );
    console.log(_id, receiverId, newMessage)
    socket.current.emit("sendMessage", {
      senderId: _id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/api/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  return (
    <Box>
      <Box borderBottom="1px solid #ccc" padding="8px 20px">
        <Grid container alignItems="center">
          <Grid item sx={{ mr: "10px" }}>
            <IconButton onClick={() => history.goBack()}>
              <ArrowBackIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="h6">Message</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          // alignItems: 'stretch',
          justifyContent: 'space-between',
          // backgroundColor: 'blue',
          height: '90vh',
        }}
      >
        <Box
          sx={{
            // backgroundColor: "red",
            // paddingLeft: "1%",
            // margin: "auto auto auto 0",
            display: "flex",
            flexDirection: "column",
            padding: "1% 3% 0 3%",
            // justifyContent: "center"
            // alignItems: "center",
            // position: "fixed",
            // bottom: 0,
            // height: "20%",
            flex: 1,
            overflowX: 'hidden',
            overflowY: 'auto'
            // width: "100%",
          }}
        >
          
            {
            messages.map((item,index)=>(
            <div ref={scrollRef}>
            <EachMessage _id={_id} type={index} key={index} msg={item.text} senderId={item.sender} />
            </div>
            ))
          }
           
         
          {/* <List
            sx={{
              width: '100%',
              maxWidth: 360,
              bgcolor: 'background.paper',
              position: 'relative',
              overflow: 'auto',
              maxHeight: 300,
              '& ul': { padding: 0 },
            }}
            subheader={<li />}
          >
            {[0, 1, 2, 3, 4].map((sectionId) => (
              <li key={`section-${sectionId}`}>
                <ul>
                  {[0, 1, 2].map((item) => (
                    <ListItem key={`item-${sectionId}-${item}`}>
                      <ListItemText primary={`Item ${item}`} />
                    </ListItem>
                  ))}
                </ul>
              </li>
            ))}
          </List> */}

          {/* <Typography>
            Area
          </Typography> */}

        </Box>
        <Box
          sx={{
            // backgroundColor: "red",
            paddingLeft: "1%",
            // margin: "auto auto auto 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // position: "fixed",
            // bottom: 0,
            // width: "100%",
          }}
        >
          <TextField
            id="outlined-multiline-flexible"          // label="Multiline"
            multiline
            maxRows={3}
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
            sx={{
              backgroundColor: "white",
              // padding:"-2%",
              width: "80%",
            }}
          // value={value}
          // onChange={handleChange}
          // variant="standard"
          />
          <Button
            variant="contained"
            size="medium"
            onClick={() => { handleSubmit() }}
            sx={{
              marginLeft: "1%"
            }}
            endIcon={<SendIcon
            />}>
            Send
          </Button>
        </Box>

      </Box>

    </Box>
  );
}
