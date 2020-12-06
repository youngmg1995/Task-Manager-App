// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------- Imports ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// node modules
import { 
  Container,
  Grid,
  Hidden,
  Paper,
  SwipeableDrawer,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import React from "react";

//local imports
import TaskListsDrawer from "./TaskListsDrawer";
import ToDoAppBar from "./ToDoAppBar";


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------ Styles ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

const useStyles: any = makeStyles(() => ({
  root: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "auto 1fr",
    width: "100vw",
    height: "100vh",
  },
  appBar: {
    gridColumn: "1/1",
    gridRow: "1/1",
  },
  contentContainer: {
    gridColumn: "1/1",
    gridRow: "2/2",
  },
  taskListsPaper: {
    borderRadius: 0,
    overflow: "auto",
  }
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
const BaseLayout: React.FC<Props> = (props) => {
  
  const { children, showTaskLists, setShowTaskLists } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      
      <div className={classes.appbar}>
        <ToDoAppBar
          showTaskLists={showTaskLists}
          setShowTaskLists={setShowTaskLists}
        />
      </div>

      <Hidden mdUp>
        <SwipeableDrawer 
          anchor="left" 
          open={showTaskLists} onClose={() => setShowTaskLists(false)} 
          onOpen={() => setShowTaskLists(true)} 
        >
          <TaskListsDrawer />
        </SwipeableDrawer>
      </Hidden>
      
      <Grid container alignItems="stretch" justify="center" className={classes.contentContainer}>
        <Hidden smDown>
          <Paper elevation={2} className={classes.taskListsPaper}>
            <TaskListsDrawer />
          </Paper>
        </Hidden>
        <Grid item container xs alignItems="stretch" justify="center">
          <Container>
            Content
            {children}
          </Container>
        </Grid>
      </Grid>

    </div>
  );
};


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------- Exports ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

export default BaseLayout;


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------- Fin --------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------