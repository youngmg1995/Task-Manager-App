// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------- Imports ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// node modules
import React, {useState} from "react";
import {
  Checkbox,
  // Divider,
  // Paper,
  Typography,
} from "@material-ui/core";
import Tooltip, { TooltipProps } from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import WhatshotIcon from '@material-ui/icons/Whatshot';

// local imports
import { ITask } from "../Tasks";


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------ Styles ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

const useStyles: any = makeStyles((theme) => ({
  root: {
    padding: `0px ${theme.spacing(2)}px`,
    display: "grid",
    gridTemplateColumns: "auto 1fr auto",
    boxShadow: "inset 0 -1.5px 0 0 rgba(100,121,143,0.122)",
    "&:hover": {
      cursor: "pointer",
      boxShadow: "inset 1px 0 0 #dadce0, inset -1px 0 0 #dadce0, 0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.3)",
    },
  },
  tooltip: {
    fontSize: 12,
  },
  primaryActions: {
    gridColumn: "1/2"
  },
  taskDetails: {
    gridColumn: "2/3",
    display: "grid",
    alignItems: "center",
    gridTemplateColumns: `${theme.spacing(1.5)}px ${theme.spacing(24)}px ${theme.spacing(4)}px 1fr`,
    overflow: "hidden",
  },
  taskTitle: {
    gridColumn: "2/3",
    overflow: "hidden",
  },
  taskDescription: {
    gridColumn: "4/5",
    overflow: "hidden",
  },
  secondaryActions: {
    gridColumn: "3/4"
  },
}));

const tooltipStyles: any = makeStyles(() => ({
  tooltip: {
    fontSize: 12,
  },
}));
function StyledTooltip(props: TooltipProps) {
  const classes = tooltipStyles();

  return <Tooltip 
    enterDelay={500} 
    // leaveDelay={200} 
    classes={classes} 
    {...props}
  />;
}


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------- Component Definition ------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// props and state types
type Props = {
  index: number,
  task: ITask,
  setSelectedTask: (inIndex: number | null) => void,
  setShowTaskDialog: (inVisible: boolean, inTaskID?: number) => void;
  deleteTask: (inTaskID: number) => Promise<void>;
  editTaskField: (inTaskID: number, inField: string, inValue: any) => Promise<void>;
};

// actual component
const TaskListItem: React.FC<Props> = (props) => {
  
  const {
    index,
    task,
    setSelectedTask,
    setShowTaskDialog,
    deleteTask,
    editTaskField,
  } = props;

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const classes = useStyles();

  function handleItemClick(): void {
    setSelectedTask(index);
  }

  function handleUrgentClick(event: any): void {
    event.stopPropagation();
    if (task._id) editTaskField(task._id, "urgent", !task.urgent);
  }

  function handleCompletedClick(event: any): void {
    event.stopPropagation();
    if (task._id) editTaskField(task._id, "completed", !task.completed);
  }

  function handleDeleteClick(event: any): void {
    event.stopPropagation();
    if (task._id) deleteTask(task._id);
  }

  function handleEditClick(event: any): void {
    event.stopPropagation();
    setShowTaskDialog(true, task._id);
  }

  return (

    <div
      className={classes.root}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleItemClick}
    >

      {/* Primary Actions */}
      <div className={classes.primaryActions}>
        {/* checkbox */}
        <StyledTooltip title="Select">
          <Checkbox />
        </StyledTooltip>
        {/* Mark Urgent */}
        <StyledTooltip title={task.urgent ? "Urgent" : "Not Urgent"}>
          <Checkbox
            checked={task.urgent}
            icon={<WhatshotIcon/>}
            checkedIcon={<WhatshotIcon/>}
            onClick={handleUrgentClick}
          />
        </StyledTooltip>
      </div>
  
      {/* Details of Task */}
      <div className={classes.taskDetails}>
        <Typography noWrap style={{textDecoration: task.completed ? "line-through" : "none"}} className={classes.taskTitle}>
          {task.title}
        </Typography>
        <Typography noWrap style={{textDecoration: task.completed ? "line-through" : "none"}} className={classes.taskDescription}>
          {task.description}
        </Typography>
      </div>

      {/* Secondary Actions (only shown if hovering over task)*/}
      {isHovered &&
        <div className={classes.secondaryActions}>
          {/* Mark Complete */}
          <StyledTooltip title={task.completed ? "Mark Incomplete" : "Mark Completed"}>
            <Checkbox
              color="default"
              checked={task.completed}
              icon={<CheckCircleIcon/>}
              checkedIcon={<CancelIcon color="inherit"/>}
              onClick={handleCompletedClick}
            />
          </StyledTooltip>
          {/* Delete */}
          <StyledTooltip title="Delete">
            <Checkbox
              checked={false}
              icon={<DeleteIcon/>}
              checkedIcon={<DeleteIcon/>}
              onClick={handleDeleteClick}
            />
          </StyledTooltip>
          {/* Edit */}
          <StyledTooltip title="Edit">
            <Checkbox
              checked={false}
              icon={<EditIcon/>}
              checkedIcon={<EditIcon/>}
              onClick={handleEditClick}
            />
          </StyledTooltip>
        </div>
      }
  
    </div>

  );
};


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------- Exports ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

export default TaskListItem;


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------- Fin --------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------