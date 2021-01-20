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
// import LabelIcon from '@material-ui/icons/Label';

import FolderIcon from '@material-ui/icons/Folder';
import ForwardIcon from '@material-ui/icons/Forward';


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

const customIconStyles: any = makeStyles(() => ({
  root: {
    display: "grid",
    gridTemplateColumns: "auto",
    gridTemplateRows: "auto",
  },
  outerIcon: {
    gridColumn: "1/2",
    gridRow: "1/2",
    alignSelf: "center",
    justifySelf: "center",
  },
  innerIcon: {
    gridColumn: "1/2",
    gridRow: "1/2",
    fontSize: 11,
    color: "white",
    alignSelf: "center",
    justifySelf: "center",
  },
}));
const MoveToIcon: React.FC = () => {

  const classes: any = customIconStyles();

  return (
    <div className={classes.root}>
      <FolderIcon fontSize="small" className={classes.outerIcon}/>
      <ForwardIcon fontSize="small" className={classes.innerIcon}/>
    </div>
  );
}


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------- Component Definition ------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// props and state types
type Props = {
  taskLists: ITaskList[],
  editSelectedTasks: (inAction: string, inTaskListID?: number) => Promise<void>,
};

// actual component
const TasksMoveToButton: React.FC<Props> = (props) => {
  
  const {
    taskLists,
    editSelectedTasks,
  } = props;

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  function handleButtonClick(event: any): void {
    setAnchorEl(event.target);
  }

  function handleMenuClose(): void {
    setAnchorEl(null);
  }

  async function handleMenuItemClick(event: any): Promise<void> {
    const taskListID: number | undefined = event.currentTarget.dataset.value;
    if (taskListID) {
      await editSelectedTasks("move to", taskListID);
    } else {
      await editSelectedTasks("move to");
    }
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
          icon={<MoveToIcon />}
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
        <MenuItem data-value={undefined} onClick={handleMenuItemClick} className={classes.menuItem}>
          <ListItemIcon classes={{root: classes.menuIcon}}>
            <Icon fontSize="small">label_off</Icon>
          </ListItemIcon>
          <ListItemText primary={<em>None</em>} />
        </MenuItem>
        {taskLists.map((inTaskList) => (
          <MenuItem key={inTaskList._id} data-value={inTaskList._id} onClick={handleMenuItemClick} className={classes.menuItem}>
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