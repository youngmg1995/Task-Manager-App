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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  taskTitle: {
    paddingLeft: theme.spacing(2),
  },
  taskDescription: {

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
};

// actual component
const TaskListItem: React.FC<Props> = (props) => {
  
  const {
    index,
    task,
    setSelectedTask,
    setShowTaskDialog,
    deleteTask,
  } = props;

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const classes = useStyles();

  function handleItemClick(): void {
    setSelectedTask(index);
  }

  function handleEditClick(event: any): void {
    event.stopPropagation();
    setShowTaskDialog(true, task._id);
  }

  function handleDeleteClick(event: any): void {
    event.stopPropagation();
    if (task._id) deleteTask(task._id);
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
        {/* fire icon (like starring or flagging an email) */}
        <StyledTooltip title="Mark Urgent">
          <Checkbox
            icon={<WhatshotIcon/>}
            checkedIcon={<WhatshotIcon color="secondary"/>}
          />
        </StyledTooltip>
      </div>
  
      {/* Details of Task */}
      <div className={classes.taskDetails}>
        <Typography className={classes.taskTitle}>
          {task.title}
        </Typography>
      </div>

      {/* Secondary Actions (only shown if hovering over task)*/}
      {isHovered &&
        <div className={classes.secondaryActions}>
          {/* Mark Complete */}
          <StyledTooltip title="Mark Complete">
            <Checkbox
              checked={false}
              icon={<CheckCircleIcon/>}
              checkedIcon={<CheckCircleIcon/>}
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