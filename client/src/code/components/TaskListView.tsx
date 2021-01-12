// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------- Imports ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// node modules
import React from "react";
import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import WhatshotIcon from '@material-ui/icons/Whatshot';

// local imports
import { ITask } from "../Tasks";


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------ Styles ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

const useStyles: any = makeStyles(() => ({
  root: {
    maxHeight: "100%",
    overflow: "auto",
  }
}));


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------- Component Definition ------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// props and state types
type Props = {
  tasks: ITask[],
  setSelectedTask: (inTask: ITask | null) => void;
};

// actual component
const TaskListView: React.FC<Props> = (props) => {
  
  const { 
    tasks,
    setSelectedTask,
  } = props;

  const classes = useStyles();

  return (

    <List className={classes.root}>
      {tasks.map((inTask) => (
        <ListItem key={inTask._id} button disableRipple divider onClick={() => setSelectedTask(inTask)}>
          <ListItemIcon>
            <Checkbox/>
          </ListItemIcon>
          <ListItemText primary={inTask.title} />
          <ListItemSecondaryAction>
            <IconButton>
              <WhatshotIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>

  );
};


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------- Exports ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

export default TaskListView;


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------- Fin --------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------