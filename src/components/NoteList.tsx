import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Box, Typography, Card, CardContent, TablePagination } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

const NoteList: React.FC = () => {
	const notes = useSelector((state: RootState) => state.notes.notes);
	const [notesPerPage, setNotesPerPage] = useState(() => parseInt(localStorage.getItem('notesPerPage') || '10'));
	const [searchParams, setSearchParams] = useSearchParams();
	const pageParam = parseInt(searchParams.get('page') || '0',);
	const [page, setPage] = useState(pageParam);

	useEffect(() => {
		if (pageParam !== page) {
			setPage(pageParam);
		}
	}, [pageParam]);

	useEffect(() => {
		localStorage.setItem('notesPerPage', notesPerPage.toString());
	}, [notesPerPage]);

	const displayedNotes = notes.slice(page * notesPerPage, (page + 1) * notesPerPage);

	const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, value: number) => {
		setPage(value);
		setSearchParams({ page: value.toString() });
	};

	const handleNotesPerPageChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setNotesPerPage(parseInt(event.target.value));

	return (
		<Box>
			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: 2,
					justifyContent: 'space-between',
				}}
			>
				{displayedNotes.map((note, index) => (
					<Card
						key={index}
						variant="outlined"
						sx={{
							flex: '0 1 calc(50% - 16px)',
							border: '1px solid #ddd',
							minWidth: '300px',
							padding: 2,
							borderRadius: 4,
							backgroundColor: '#f9f9f9',
							marginBottom: 2,
							boxSizing: 'border-box',
						}}
					>
						<CardContent>
							<Typography variant="h6">{note.sign}</Typography>
							<Typography variant="subtitle2" color="textSecondary">
								{note.date.datetime}
							</Typography>
							<Typography variant="body1">{note.text}</Typography>
						</CardContent>
					</Card>
				))}
			</Box>

			<Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
				<TablePagination
					component="div"
					count={notes.length}
					page={page}
					onPageChange={handlePageChange}
					rowsPerPage={notesPerPage}
					onRowsPerPageChange={handleNotesPerPageChange}
				/>
			</Box>
		</Box>
	);
};

export default NoteList;