// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------- Imports ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// node modules
import React from "react";
import {
  Checkbox,
  Menu,
  MenuItem,
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';

// local imports


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------ Styles ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

const actions: any[] = [
  {action: "all", label: "All"},
  {action: "none", label: "None"},
  {action: "urgent", label: "Urgent"},
  {action: "not urgent", label: "Not Urgent"},
  {action: "completed", label: "Completed"},
  {action: "not completed", label: "Not Completed"},
];


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------ Styles ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

const useStyles: any = makeStyles((theme) => ({
  root: {
  },
  tooltip: {
    fontSize: 12,
    marginTop: 4,
  },
  select: {
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
  dropDownItem: {
    padding: `${theme.spacing(.5)}px ${theme.spacing(4)}px`,
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

  const selectRef: any = React.createRef();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  function handleDropdownClick(): void {
    setAnchorEl(currentAnchorEl => {
      if (Boolean(currentAnchorEl)) return null;
      else return selectRef.current;
    });
  }

  function handleMenuClose(): void {
    setAnchorEl(null);
  }

  function handleMenuItemClick(event: any): void {
    const action: string = event.target.id;
    console.log(action);
    setSelectedTasks(action);
    handleMenuClose();    
  }

  function handleSelectClick(): void {
    if (noneSelected) setSelectedTasks("all");
    else setSelectedTasks("none");
  }

  return (

    <div className={classes.root}>

      {/* Actual Select Component */}
      <Tooltip 
        title="Select" 
        enterDelay={500} 
        classes={{tooltip: classes.tooltip}}
      >
        <div ref={selectRef} className={classes.select}>

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
            onClick={handleDropdownClick}
            classes={{root: classes.dropDownButton}}
          />

        </div>
      </Tooltip>

      {/* Menu for Dropdown */}
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        getContentAnchorEl={null}
        keepMounted
        MenuListProps={{
          dense: true,
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {actions.map((inAction) => (
          <MenuItem key={inAction.action} id={inAction.action} onClick={handleMenuItemClick} className={classes.dropDownItem}>
            {inAction.label}
          </MenuItem>
        ))}
      </Menu>

    </div>

  );
};


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------- Exports ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

export default TasksSelectButton;


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------- Fin --------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------