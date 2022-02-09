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
  } from "@mui/material";
  import format from "date-fns/format";
  
  import { Box } from "@mui/system";
  import React, { useEffect, useState } from "react";
  import ArrowBackIcon from "@mui/icons-material/ArrowBack";
  import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
  import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
  import SyncIcon from "@mui/icons-material/Sync";
  import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
  import FavoriteIcon from "@mui/icons-material/Favorite";
  
  import IosShareIcon from "@mui/icons-material/IosShare";
  import { useHistory, useParams } from "react-router";
  import { useDispatch, useSelector } from "react-redux";
  import { getComments, getPostDetails } from "../redux/postSlice";
  import { addComment, deletePost, likeOrDislikePost } from "../api";
  import Comment from "../components/Comment";
  
  export default function MessageDetails() {
    const [commentText, setCommentText] = useState("");
    const theme = useTheme();
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const { status, comments, commentStatus, postDetails } = useSelector(
      (state) => state.post
    );
  
    const { _id } = JSON.parse(localStorage.getItem("login"));

  

    useEffect(() => {
      dispatch(getPostDetails(id));
      dispatch(getComments(id));
    }, [dispatch, id]);
  

  
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

      </Box>
    );
  }
  