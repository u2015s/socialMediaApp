import { CircularProgress, Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import AssistantIcon from "@mui/icons-material/Assistant";
import MessageCard from "../components/MessageCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getFollowings } from "../redux/followSlice";

export default function Message() {
  const dispatch = useDispatch();
  const { followings, followers, followingStatus} = useSelector((state) => state.follow);
  const { _id } = JSON.parse(localStorage.getItem("login"));

  useEffect(() => {
    dispatch(getFollowings(_id));
  }, [dispatch]);

  return (
    <Box>
      <Box borderBottom="1px solid #ccc" padding="8px 20px">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6">Messages</Typography>
          </Grid>
          <Grid item>
          </Grid>
        </Grid>
      </Box>
      <Box height="92vh" sx={{ overflowY: "scroll" }}>
        <Box textAlign="center">
          {followingStatus === "loading" && (
            <CircularProgress size={20} color="primary" />
          )}
        </Box>
        {followingStatus === "success" &&
          followings.map((item) => <MessageCard key={item._id} item={item} />)}
      </Box>
    </Box>
  );
}
