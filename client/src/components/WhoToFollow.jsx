import { Typography, useTheme } from "@mui/material";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, {useEffect,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {DeleteFollowingAccount, followingAccount} from '../api'
import { getFollowings } from "../redux/followSlice";

export default function WhoToFollow({ user }) {
  const theme = useTheme();
  const { _id } = JSON.parse(localStorage.getItem("login"));
  const [isFollowing,setIsFollowing] = useState(false);
  // console.log("10", user)
  const dispatch = useDispatch();
  const { followings, followers, followingStatus} = useSelector((state) => state.follow);
  
  

  useEffect(() => {
      // console.log(followingStatus)
      if(followingStatus==="success"){
        // console.log(followings[0])
    
        for(let i = 0; i < followings.length; i++){
          let item = followings[i]._id;
          if(item === user._id){
            // console.log("true 35")
            setIsFollowing(true);
          }
        }
      }
  }, [followingStatus]);
  
 


  // console.log("10", followings, followers);
  const handleFollow = async () => {
    console.log("39")
    const response = await followingAccount({ userId:_id, followingId: user._id });
    if (response.message === "following added successfully.") {
      setIsFollowing(true);
    }
  };

  const handleUnFollow = async () => {
    const response = await DeleteFollowingAccount({ userId:_id, deleteId: user._id});
    console.log(response.message);
    if (response.message === "following removed successfully.") {
      // dispatch(updateLike({ id: post._id }));
      dispatch(getFollowings(_id));
      setIsFollowing(false);

    }
  };
  
  return (
    <Box margin="1rem 0">
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Grid container>
            <Grid item sx={{ paddingRight: "12px" }}>
              <img src="/user.png" width="50px" alt="logo" />
            </Grid>
            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
                    {user.name}
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Typography
                      sx={{ fontSize: "14px", mr: "6px", color: "#555" }}
                    >
                      {"@" + user.handle}
                    </Typography>
                    
                    {/* <Typography
                      sx={{
                        fontSize: "12px",
                        background: "#ccc",
                        borderRadius: theme.shape.borderRadius,
                        padding: "0 6px",
                        color: "#777",
                      }}
                    >
                      follows you
                    </Typography> */}

                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {
            isFollowing ? 
            <Button
            size="small"
            sx={{
              borderRadius: theme.shape.borderRadius,
              textTransform: "capitalize",
              ml: "12px",
              background: "black",
              "&:hover": {
                background: "#333",
              },
            }}
            variant="contained"
            onClick={(e) => {
              // e.preventDefault();
              handleUnFollow()
            }}
          >
            Unfollow
          </Button>
            
            :

            <Button
            size="small"
            sx={{
              borderRadius: theme.shape.borderRadius,
              textTransform: "capitalize",
              ml: "12px",
              background: "black",
              "&:hover": {
                background: "#333",
              },
            }}
            variant="contained"
            onClick={(e) => {
              // e.preventDefault();
              handleFollow()
            }}
          >
            Follow
          </Button>  
          }
          
        </Grid>
      </Grid>
    </Box>
  );
}
