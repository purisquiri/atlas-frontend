import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import ChatIcon from "@material-ui/icons/Chat";
import CloseIcon from "@material-ui/icons/Close";
import Logout from "../components/Logout";
import { Route, useHistory } from "react-router-dom";
import Reviews from "./Reviews";
import GitHubIcon from "@material-ui/icons/GitHub";

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  spanDrawer: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 15),
    // necessary for content to be below app bar
  },
  name: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 14),
    marginLeft: 20,
    // necessary for content to be below app bar
  },
  nameTwo: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 14),
    marginLeft: 20,
    // necessary for content to be below app bar
  },



  marginAutoItem: {
    // margin: "auto",
    marginLeft: "10px",
  },
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [logout, setLogout] = React.useState(false);
  const [openReview, setReview] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const openReviews = () => {
    setReview(true);
    if (openReview === true) {
      setReview(false);
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        style={{ background: "#333" }}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" noWrap>
            ATLAS
          </Typography>
          {/* <div className={classes.marginAutoItem}>
            Welcome {localStorage.getItem("username")}
          </div> */}
          <Typography className={classes.marginAutoItem} variant="h6" noWrap>
            Welcome {localStorage.getItem("username")}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {["Stories", "Log Out"].map((text, index) =>
            index === 1 ? (
              <ListItem
                onClick={() => setLogout(true)}
                button
                key={text}
                id={index}
              >
                <ListItemIcon>
                  {index % 2 === 0 ? <ChatIcon /> : <CloseIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ) : index === 0 ? (
              <ListItem
                onClick={() => openReviews()}
                button
                key={text}
                id={index}
              >
                <ListItemIcon>
                  {index % 2 === 0 ? <ChatIcon /> : <CloseIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ) : (
              <ListItem button key={text} id={index}>
                <ListItemIcon>
                  {index % 2 === 0 ? <ChatIcon /> : <CloseIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
        </List>

        {logout === true ? <Logout /> : null}
        {openReview === true ? <Reviews /> : null}
        <Divider />
        <h3 className={classes.spanDrawer}>Created By: </h3>
        <div className={classes.name}>
          <GitHubIcon />
          <h5><a href='https://github.com/purisquiri' target='_blank'>Mauro</a></h5>
        </div>
        <div className={classes.nameTwo}>
          <GitHubIcon />
          
          <h5> <a href='https://github.com/jacobkagon' target='_blank'>Jacob </a> </h5>
          
        </div>

        {/* <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>
  );
}
