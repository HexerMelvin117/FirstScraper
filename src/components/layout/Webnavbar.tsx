import React, { useContext, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { 
	AppBar,
	Toolbar,
	Typography,
	Button
} from '@material-ui/core';
import { Store } from '../contexts/UserContext';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const Webnavbar: React.FC = () => {
	const { state, dispatch } = useContext(Store);
	const [modalOpen, setModalOpen] = useState(false)
	const classes = useStyles();

	const handleLogout = () => {
    return dispatch({
      type: 'LOG_OUT'
    })
	}

  return(
		<AppBar position="static" style={{backgroundColor: "#00bcd4"}}>
			<Toolbar>
				<Typography className={classes.title} >First Scraper</Typography>
				<Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
					<Button color="inherit">Scraper</Button>
				</Link>
				{ state.isAuthenticated ? null :
				<Link to="/register" style={{ textDecoration: 'none', color: 'inherit' }}>
					<Button color="inherit">Register</Button>
				</Link>}
				{ state.isAuthenticated ? <Button color="inherit" onClick={() => handleLogout()}>Log Out</Button> : 
				<Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}><Button color="inherit">Log In</Button></Link> }
			</Toolbar>
		</AppBar>
	)
}

export default Webnavbar