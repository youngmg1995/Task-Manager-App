// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------- Imports ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// node modules
import React from "react";
import {
  Checkbox,
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';

// local imports


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------ Styles ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

const useStyles: any = makeStyles(() => ({
  root: {
  },
  tooltip: {
    fontSize: 12,
  },
  selectButton: {
    width: 28,
    height: 40,
    borderRadius: 2,
    padding: 0,
  },
  dropDownButton: {
    position: "relative",
    left: -4,
    width: 20,
    height: 40,
    borderRadius: 2,
    padding: 0,
  },
}));


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
const TasksSelectButton: React.FC<Props> = (props) => {
  
  const {
    noneSelected,
    allSelected,
    setSelectedTasks,
  } = props;

  const classes = useStyles();

  function handleSelectClick(): void {
    if (noneSelected) setSelectedTasks("all");
    else setSelectedTasks("none");
  }

  return (

    <Tooltip 
      title="Select" 
      enterDelay={500} 
      classes={{tooltip: classes.tooltip}}
    >
      <div className={classes.root}>

        {/* Select Checkbox */}
        <Checkbox 
          size="small"
          disableRipple
          checked={allSelected && !noneSelected}
          indeterminate={!allSelected && !noneSelected}
          indeterminateIcon={<IndeterminateCheckBoxIcon color="secondary"/>}
          onClick={handleSelectClick}
          classes={{root: classes.selectButton}}
        />

        {/* Select Dropdown */}
        <Checkbox 
          size="small"
          disableRipple
          icon={<ArrowDropDownIcon />}
          checked={false}
          classes={{root: classes.dropDownButton}}
        />

      </div>
    </Tooltip>

  );
};


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------- Exports ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

export default TasksSelectButton;


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------- Fin --------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------