// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------- Imports ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// node modules
import React from "react";
import {
  Checkbox,
  Divider,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Tooltip, { TooltipProps } from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import WhatshotOutlinedIcon from '@material-ui/icons/WhatshotOutlined';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

// local imports
import { ITaskList } from "../TaskLists";
import TasksMoveToButton from "./TasksMoveToButton";
import TasksSelectButton from "./TasksSelectButton";


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------ Styles ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

const useStyles: any = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    gap: theme.spacing(1),
    alignItems: "center",
    padding: `${theme.spacing(.5)}px ${theme.spacing(2)}px`,
    boxShadow: "inset 0 -1px 0 0 rgba(100,121,143,0.122)",
  },
  divider: {
    height: "24px",
    padding: `0 ${theme.spacing(1)}`,
  },
  checkbox: {
  },
}));

const tooltipStyles: any = makeStyles(() => ({
  tooltip: {
    fontSize: 12,
    marginTop: 4,
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
  noneSelected: boolean,
  allSelected: boolean,
  setSelectedTasks: (inAction: string, inTaskID?: number) => void,
  taskLists: ITaskList[],
  editSelectedTasks: (inAction: string, inTaskListID?: number) => Promise<void>,
};

// actual component
const TaskListViewToolbar: React.FC<Props> = (props) => {
  
  const { 
    noneSelected,
    allSelected,
    setSelectedTasks,
    taskLists,
    editSelectedTasks,
  } = props;

  const classes = useStyles();

  function handleDeleteClick(): void {
    editSelectedTasks("delete");
  }

  function handleNotUrgentClick(): void {
    editSelectedTasks("mark not urgent");
  }

  function handleUrgentClick(): void {
    editSelectedTasks("mark urgent");
  }

  function handleIncompleteClick(): void {
    editSelectedTasks("mark incomplete");
  }

  function handleCompletedClick(): void {
    editSelectedTasks("mark completed");
  }

  return (

    <div className={classes.root}>

      {/* Select Button */}
      <TasksSelectButton 
        noneSelected={noneSelected}
        allSelected={allSelected}
        setSelectedTasks={setSelectedTasks}
      />

      {/* Select Actions */}
      {!noneSelected &&
        <React.Fragment>

          <div className={classes.divider}>
            <Divider orientation="vertical" light/>
          </div>

          {/* Delete */}
          <StyledTooltip title="Delete">
            <Checkbox
              size="small"
              checked={false}
              icon={<DeleteIcon/>}
              checkedIcon={<DeleteIcon/>}
              onClick={handleDeleteClick}
            />
          </StyledTooltip>
          {/* Switch Task List */}
          <TasksMoveToButton 
            taskLists={taskLists}
            editSelectedTasks={editSelectedTasks}
          />

          <div className={classes.divider}>
            <Divider orientation="vertical" light/>
          </div>
          
          {/* Mark Not Urgent */}
          <StyledTooltip title="Mark Not Urgent">
            <Checkbox
              size="small"
              checked={false}
              icon={<WhatshotOutlinedIcon/>}
              checkedIcon={<WhatshotOutlinedIcon/>}
              onClick={handleNotUrgentClick}
            />
          </StyledTooltip>
          {/* Mark Urgent */}
          <StyledTooltip title="Mark Urgent">
            <Checkbox
              size="small"
              checked={false}
              icon={<WhatshotIcon/>}
              checkedIcon={<WhatshotIcon/>}
              onClick={handleUrgentClick}
            />
          </StyledTooltip>

          <div className={classes.divider}>
            <Divider orientation="vertical" light/>
          </div>
          
          {/* Mark Incomplete */}
          <StyledTooltip title="Mark Incomplete">
            <Checkbox
              size="small"
              checked={false}
              icon={<CancelIcon/>}
              checkedIcon={<CancelIcon/>}
              onClick={handleIncompleteClick}
            />
          </StyledTooltip>
          {/* Mark Completed */}
          <StyledTooltip title="Mark Completed">
            <Checkbox
              size="small"
              checked={false}
              icon={<CheckCircleIcon/>}
              checkedIcon={<CheckCircleIcon/>}
              onClick={handleCompletedClick}
            />
          </StyledTooltip>

        </React.Fragment>
      }

    </div>

  );
};


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------- Exports ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

export default TaskListViewToolbar;


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------- Fin --------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------