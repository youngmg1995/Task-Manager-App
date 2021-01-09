// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------- Imports ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// node modules
import React from "react";
import {
  AppBar,
  Fab,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
// import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from "@material-ui/icons/Menu";


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------ Styles ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

const useStyles: any = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  composeButton: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------- Component Definition ------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// props and state types
type Props = {
  showTaskLists: boolean,
  setShowTaskLists: (inVisible: boolean) => void;
};

// actual component
const ToDoAppBar: React.FC<Props> = (props) => {
  
  const { showTaskLists, setShowTaskLists } = props;

  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Hidden mdUp>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => setShowTaskLists(!showTaskLists)}>
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Typography variant="h6" className={classes.title}>
          ToDo App
        </Typography>
        <Fab color="inherit" size="medium" aria-label="menu" className={classes.composeButton}>
          <AddIcon color="primary" fontSize="large"/>
        </Fab>
        {/* Old Compose Button */}
        {/* <IconButton edge="end" color="inherit" aria-label="menu">
          <AddCircleIcon fontSize="large"/>
        </IconButton> */}
      </Toolbar>
    </AppBar>
  );
};


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------- Exports ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

export default ToDoAppBar;


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------- Fin --------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------