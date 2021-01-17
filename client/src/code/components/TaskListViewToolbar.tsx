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
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

// local imports
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
  setSelectedTasks: (inAction: string, inTaskID?: number) => void;
};

// actual component
const TaskListViewToolbar: React.FC<Props> = (props) => {
  
  const { 
    noneSelected,
    allSelected,
    setSelectedTasks,
  } = props;

  const classes = useStyles();

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
            />
          </StyledTooltip>
          {/* Switch Task List */}
          <StyledTooltip title="Move To">
            <Checkbox
              size="small"
              checked={false}
              icon={<MoveToInboxIcon/>}
              checkedIcon={<MoveToInboxIcon/>}
            />
          </StyledTooltip>

          <div className={classes.divider}>
            <Divider orientation="vertical" light/>
          </div>
          
          {/* Mark Not Urgent */}
          <StyledTooltip title="Mark Not Urgent">
            <Checkbox
              size="small"
              checked={false}
              icon={<WhatshotIcon/>}
              checkedIcon={<WhatshotIcon/>}
            />
          </StyledTooltip>
          {/* Mark Urgent */}
          <StyledTooltip title="Mark Urgent">
            <Checkbox
              size="small"
              checked={false}
              icon={<WhatshotIcon color="secondary"/>}
              checkedIcon={<WhatshotIcon color="secondary"/>}
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
            />
          </StyledTooltip>
          {/* Mark Completed */}
          <StyledTooltip title="Mark Completed">
            <Checkbox
              size="small"
              checked={false}
              icon={<CheckCircleIcon/>}
              checkedIcon={<CheckCircleIcon/>}
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