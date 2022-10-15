import { CircularProgress, Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import AssistantIcon from "@mui/icons-material/Assistant";
import MessageCard from "../components/MessageCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getFollowings } from "../redux/followSlice";
import { getProfile } from "../redux/authSlice";
import axios from "axios";
import { DeleteFollowingAccount, followingAccount, getUserProfile } from '../api'
import _ from "lodash";

export default function Message() {
  const dispatch = useDispatch();
  const { followings, followers, followingStatus } = useSelector((state) => state.follow);
  const { profile, status } = useSelector((state) => state.auth);
  const { _id } = JSON.parse(localStorage.getItem("login"));
  const [conversations, setConversations] = useState([]);
  const conversationIds = new Set()
  const [convData, setConvData] = useState([]);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  function check(item){
    var fid =  item.members.find((member) => member !== _id);
    if(conversationIds.has(fid)){
      return "";
    }else{
      conversationIds.add(fid)
      return fid;

    }


  }

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/api/conversations/" + _id);
        setConversations(res.data);
        var conData = []
        let counter = 0
        res.data.forEach(async (item) => {
          const friendId = check(item);
          
          if(friendId!==""){
            const data = await getUserProfile(friendId)
            data.profile.conversation = item
            // var arr = [...data.profile,]
            // console.log(data.profile)
            conData.push(data.profile)
          }
          counter++;
          // console.log(counter)
          if(counter === res.data.length){
            setConvData(prev => {
              // var arr
                // console.log(conData)
                var arr = _.cloneDeep(conData)
                // console.log(arr)
                return arr;
              })
          }
          
        })
        
        
        

      } catch (err) {
        console.log(err);
      }
    };
    // const getConvData = async () => {


    // }
    getConversations();
  }, [_id]);

  // }, [conversations,_id]);

  // useEffect(() => {
  //   if (profile.userId) {
  //     dispatch(getFollowers(profile.userId._id));
  //     dispatch(getFollowings(profile.userId._id));
  //   }
  // }, [dispatch, profile.userId]);




  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + _id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [_id]);


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
        {
          convData.length > 0 ?

            <>{
              convData.map((item, index) =><MessageCard key={index} item={item.userId} con = {item.conversation} />)
            }
            </>
            :
            <Box textAlign="center">
                <CircularProgress size={20} color="primary" />
            </Box>

        }
      </Box>
    </Box>
  );
}
