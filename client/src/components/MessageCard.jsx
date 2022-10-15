import {
  Grid,
  IconButton,
  Input,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import React, { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SyncIcon from "@mui/icons-material/Sync";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IosShareIcon from "@mui/icons-material/IosShare";
import { Link } from "react-router-dom";
import { addComment, deletePost, likeOrDislikePost } from "../api";
import { useDispatch } from "react-redux";
import { getPosts, updateLike } from "../redux/postSlice";
import Modal from "./Modal";
import { getProfile } from "../redux/authSlice";

export default function MessageCard({ item, con }) {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { _id } = JSON.parse(localStorage.getItem("login"));


  return (
    <>
      <Link
        to={{
          pathname:`/messages/${item._id}`,
          state:{con:con}
        
        }}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Box
          padding="1rem"
          sx={{
            "&:hover": {
              backgroundColor: "#eee",
            },
          }}
        >
          <Grid container
          // flexWrap="nowrap"
          >
            <Grid item sx={{ paddingRight: "1rem" }}>
              <Link to={`/profile/${item._id}`}>
                <img src="/user.png" alt="lgoog" width="50px" />
              </Link>
            </Grid>
            <Grid item flexGrow="1">
              <Box>
                <Grid
                  container
                  // justifyContent="space-between"
                  // alignItems="center"
                  // flexWrap="nowrap"
                >
                  <Grid
                  container
                  flexWrap="nowrap"
                  justifyContent="space-between"
                  // lg={12}
                  >
                    <Grid item>
                      <Box
                        // display="flex"
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          // justifyContent: "center"
                        }}
                      >
                        <Typography
                          sx={{ fontSize: "16px", fontWeight: 500, mr: "6px" }}
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                        >
                          @{item.handle}
                        </Typography>
                      </Box>
                    </Grid>
                    

                    <Grid item>
                      <Box>
                        <Typography
                          sx={{ fontSize: "15px", ml: "auto", color: "#555" }}
                        >
                          {/* {formatDistanceToNow(new Date(item.createdAt))} */}
                          6m
                        </Typography>
                      </Box>
                    </Grid>

                    
                  </Grid>

                    {/* <Grid item>
                      <Box>
                        <Typography sx={{ fontSize: "15px", color: "#555" }}>
                          How are you
                        </Typography>
                      </Box>
                    </Grid> */}

                </Grid>


              </Box>
            </Grid>
          </Grid>
        </Box>
      </Link>
    </>
  );
}
