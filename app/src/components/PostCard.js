import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { MoreVert } from "@mui/icons-material";

function PostCard(props) {
  return (
    <>
      <Card sx={{ width: 700, height: 250 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVert />
            </IconButton>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
          p={2}
        >
          <CardContent sx={{ width: "70%" }}>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            image="/static/iwall.jpeg"
            alt="green iguana"
            sx={{ width: "30%", objectFit: "contain" }}
          />
        </Stack>
      </Card>
    </>
  );
}

export default PostCard;
