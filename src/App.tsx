import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CustomTabPanel, TabNavigation } from './components/TabNavigation';
import Box from '@mui/material/Box';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';

const App: React.FC = () => {
	return (
		<Router>
			<Box sx={{ width: '100%' }}>
				<TabNavigation />
				<Routes>
					<Route path="/" element={<CustomTabPanel><NoteForm /></CustomTabPanel>} />
					<Route path="/notes" element={<CustomTabPanel><NoteList /></CustomTabPanel>} />
				</Routes>
			</Box>
		</Router>
	);
};

export default App;