// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------- Imports ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// node modules
import React, {useState} from "react";
import {
  Checkbox,
  Typography,
} from "@material-ui/core";
import Tooltip, { TooltipProps } from '@material-ui/core/Tooltip';
import { makeStyles, fade } from '@material-ui/core/styles';
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
    position: "relative",
    padding: `${theme.spacing(.25)}px ${theme.spacing(2)}px`,
    display: "grid",
    alignItems: "center",
    gridTemplateColumns: "auto auto 200px 1fr auto",
    backgroundColor: (props: Props) => props.selected ? fade(theme.palette.background.default, 1) : "transparent",
    boxShadow: "inset 0 -1px 0 0 rgba(100,121,143,0.122)",
    "&:hover": {
      cursor: "pointer",
      boxShadow: "inset 1px 0 0 #dadce0, inset -1px 0 0 #dadce0, 0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.3)",
      zIndex: 10,
    },
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: "auto 1fr auto auto",
      gridTemplateRows: "auto auto",
    },
  },
  tooltip: {
    fontSize: 12,
  },
  selectIcon: {
    gridColumn: "1/2",
    marginRight: theme.spacing(.25),
    [theme.breakpoints.down('xs')]: {
      gridRow: "1/2",
      marginRight: theme.spacing(1.5),
    },
  },
  urgentIcon: {
    gridColumn: "2/3",
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      gridColumn: "4/5",
      gridRow: "2/3",
      marginRight: 0,
      marginLeft: theme.spacing(1.5),
    },
  },
  taskTitle: {
    gridColumn: "3/4",
    marginRight: "36px",
    overflow: "hidden",
    [theme.breakpoints.down('xs')]: {
      gridColumn: "2/3",
      gridRow: "1/2",
      marginRight: 0,
    },
  },
  taskDescription: {
    gridColumn: "4/5",
    overflow: "hidden",
    [theme.breakpoints.down('xs')]: {
      gridColumn: "2/4",
      gridRow: "2/3",
    },
  },
  secondaryActions: {
    gridColumn: "5/6",
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      gridColumn: "3/5",
      gridRow: "1/2",
    },
  },
  secondaryActionIcon: {
    marginRight: theme.spacing(.75),
  },
  checkbox: {
    width: 28,
    height: 28,
    padding: 0,
  },
}));

const tooltipStyles: any = makeStyles(() => ({
  tooltip: {
    fontSize: 12,
    marginTop: 8,
  },
}));
function StyledTooltip(props: TooltipProps) {
  const classes = tooltipStyles();

  return (
    <Tooltip 
      enterDelay={500} 
      // leaveDelay={200} 
      classes={classes} 
      {...props}
    />
  );
}


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------- Component Definition ------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// props and state types
type Props = {
  index: number,
  task: ITask,
  selected: boolean,
  setSelectedTasks: (inAction: string, inTaskID?: number) => void;
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
    selected,
    setSelectedTasks,
    setSelectedTask,
    setShowTaskDialog,
    deleteTask,
    editTaskField,
  } = props;

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const classes = useStyles({selected: selected});

  function handleItemClick(): void {
    setSelectedTask(index);
  }

  function handleSelectClick(event: any): void {
    event.stopPropagation();
    if (task._id) {
      const action: string = selected ? "remove" : "add";
      setSelectedTasks(action, task._id);
    }
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

      {/* Select */}
      <div className={classes.selectIcon}>
        <StyledTooltip title="Select">
          <Checkbox 
            size="small"
            checked={selected}
            onClick={handleSelectClick}
            classes={{root: classes.checkbox}}
          />
        </StyledTooltip>
      </div>
      {/* Mark Urgent */}
      <div className={classes.urgentIcon}>
        <StyledTooltip title={task.urgent ? "Urgent" : "Not Urgent"}>
          <Checkbox
            size="small"
            checked={task.urgent}
            icon={<WhatshotIcon/>}
            checkedIcon={<WhatshotIcon/>}
            onClick={handleUrgentClick}
            classes={{root: classes.checkbox}}
          />
        </StyledTooltip>
      </div>
  
      {/* Details of Task */}
      <Typography variant="body2" noWrap style={{textDecoration: task.completed ? "line-through" : "none"}} className={classes.taskTitle}>
        {task.title}
      </Typography>
      <Typography variant="body2" noWrap style={{textDecoration: task.completed ? "line-through" : "none"}} className={classes.taskDescription}>
        {task.description}
      </Typography>

      {/* Secondary Actions (only shown if hovering over task)*/}
      {isHovered &&
        <div className={classes.secondaryActions}>
          {/* Mark Complete */}
          <StyledTooltip title={task.completed ? "Mark Incomplete" : "Mark Completed"}>
            <Checkbox
              size="small"
              color="default"
              checked={task.completed}
              icon={<CheckCircleIcon/>}
              checkedIcon={<CancelIcon color="inherit"/>}
              onClick={handleCompletedClick}
              className={classes.secondaryActionIcon}
              classes={{root: classes.checkbox}}
            />
          </StyledTooltip>
          {/* Delete */}
          <StyledTooltip title="Delete">
            <Checkbox
              size="small"
              checked={false}
              icon={<DeleteIcon/>}
              checkedIcon={<DeleteIcon/>}
              onClick={handleDeleteClick}
              className={classes.secondaryActionIcon}
              classes={{root: classes.checkbox}}
            />
          </StyledTooltip>
          {/* Edit */}
          <StyledTooltip title="Edit">
            <Checkbox
              size="small"
              checked={false}
              icon={<EditIcon/>}
              checkedIcon={<EditIcon/>}
              onClick={handleEditClick}
              classes={{root: classes.checkbox}}
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