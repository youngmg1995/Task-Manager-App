// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------- Imports ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// node modules
import React from "react";
import {
  Checkbox,
  Icon,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import LabelIcon from '@material-ui/icons/Label';
// import LabelOffIcon from '@material-ui/icons/LabelOff';
// import MoveToInboxIcon from '@material-ui/icons/MoveToInbox';


// local imports
import { ITaskList } from "../TaskLists";


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
  menuItem: {
    padding: `${theme.spacing(.5)}px ${theme.spacing(4)}px ${theme.spacing(.5)}px ${theme.spacing(2)}px`,
  },
  menuIcon: {
    minWidth: "36px",
  }
}));


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------- Component Definition ------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// props and state types
type Props = {
  taskLists: ITaskList[],
};

// actual component
const TasksMoveToButton: React.FC<Props> = (props) => {
  
  const {
    taskLists,
  } = props;

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  function handleButtonClick(event: any): void {
    setAnchorEl(event.target);
  }

  function handleMenuClose(): void {
    setAnchorEl(null);
  }

  function handleMenuItemClick(): void {
    handleMenuClose();    
  }

  return (

    <div className={classes.root}>

      {/* Actual Button */}
      <Tooltip 
        title="Move To" 
        enterDelay={500} 
        classes={{tooltip: classes.tooltip}}
      >
        <Checkbox 
          size="small"
          disableRipple
          checked={false}
          icon={<LabelIcon />}
          onClick={handleButtonClick}
        />
      </Tooltip>

      {/* Menu for Button */}
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
        <MenuItem onClick={handleMenuItemClick} className={classes.menuItem}>
          <ListItemIcon classes={{root: classes.menuIcon}}>
            <Icon fontSize="small">label_off</Icon>
          </ListItemIcon>
          <ListItemText primary={<em>None</em>} />
        </MenuItem>
        {taskLists.map((inTaskList) => (
          <MenuItem key={inTaskList._id} onClick={handleMenuItemClick} className={classes.menuItem}>
            <ListItemIcon classes={{root: classes.menuIcon}}>
              <Icon fontSize="small">{inTaskList.icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={inTaskList.title} />
          </MenuItem>
        ))}
      </Menu>

    </div>

  );
};


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------- Exports ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

export default TasksMoveToButton;


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------- Fin --------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------