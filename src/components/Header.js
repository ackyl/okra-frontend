import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import {Link, Redirect} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
  },
  bg: {
    background: '#ffffff',
    color: '#212121'
  },
  stripe: {
    height: 1,
    background: '#212121',
    opacity: 0.2
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  }
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <AppBar position="static" className={classes.bg}> */}
        <Toolbar className={classes.bg}>
          <Typography variant="h6" className={classes.title}>
            <Link to="/">
              Okra Record Store
            </Link>
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>

          <IconButton color="inherit">
              <ShoppingCart />
          </IconButton>
          
          <IconButton
            edge="end"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>

        </Toolbar>

        <div className={classes.stripe}>
        </div>
      {/* </AppBar> */}
    </div>
  );
}