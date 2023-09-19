import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { hot } from 'react-hot-loader';
import MainRouter from './MainRouter.jsx';
import Menu from './core/Menu.jsx';
import theme from './theme';

const App = () => {
	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<Menu/>
				<MainRouter/>
			</ThemeProvider>
		</BrowserRouter>
	);
};

export default hot(module)(App);
