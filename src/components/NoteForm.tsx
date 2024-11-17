import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addNote } from '../redux/noteSlice';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Box, CircularProgress, Snackbar, Alert, Fade, Typography } from '@mui/material';
import { Send } from '@mui/icons-material';

const NoteForm: React.FC = () => {
	const [text, setText] = useState('');
	const [sign, setSign] = useState(() => localStorage.getItem('userSign') || '');
	const [tz, setTz] = useState(() => localStorage.getItem('userTimezone') || '');
	const [timezones, setTimezones] = useState<string[]>([]);
	const [loadingTimezones, setLoadingTimezones] = useState(true);
	const [errorLoadingTimezones, setErrorLoadingTimezones] = useState(false);
	const [isNoteAdded, setIsNoteAdded] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		fetch('https://worldtimeapi.org/api/timezone')
			.then((response) => response.json())
			.then((data) => {
				setTimezones(data);
				setLoadingTimezones(false);
			})
			.catch(() => {
				setErrorLoadingTimezones(true);
				setLoadingTimezones(false);
			});
	}, []);

	useEffect(() => {
		localStorage.setItem('userSign', sign);
	}, [sign]);

	useEffect(() => {
		localStorage.setItem('userTimezone', tz);
	}, [tz]);

	const handleSubmit = async () => {
		const response = await fetch(`https://worldtimeapi.org/api/timezone/${tz}`);
		const date = await response.json();

		const note = { text, sign, tz, date };
		dispatch(addNote(note));

		setIsNoteAdded(true);
		setText('');
	};

	const isFormComplete = text && sign && tz;

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 500, position: "relative" }}>
			<Box sx={{
				width: '100%',
				height: '100%',
				backgroundColor: 'rgba(255, 255, 255, 0.1)',
				backdropFilter: "blur(1px)",
				position: 'absolute',
				display: loadingTimezones ? 'flex' : 'none',
				alignItems: 'center',
				justifyContent: 'center',
				zIndex: 2
			}}>
				<Fade
					in={loadingTimezones}
					unmountOnExit>
					<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
						<CircularProgress />
						<Typography sx={{ mt: 2, maxWidth: 200, textAlign: "center" }}>Загрузка часовых поясов, пожалуйста, подождите</Typography>
					</Box>
				</Fade>
			</Box>
			<Box>
				<TextField
					variant="outlined"
					label="Запись"
					value={text}
					multiline
					fullWidth
					rows={4}
					slotProps={{
						inputLabel: {
							shrink: true,
						}
					}}
					onChange={(e) => setText(e.target.value)}
				/>
			</Box>
			<Box sx={{ display: "flex", gap: 1 }}>
				<TextField
					variant="outlined"
					label="Подпись"
					value={sign}
					required
					fullWidth
					slotProps={{
						htmlInput: {
							maxLength: 100
						},
						inputLabel: {
							shrink: true,
						}
					}}
					onChange={(e) => setSign(e.target.value)}
				/>
				<FormControl sx={{ width: "50%" }} >
					<InputLabel shrink>Часовой пояс</InputLabel>
					<Select
						value={tz}
						onChange={(e) => setTz(e.target.value as string)}
						label="Часовой пояс"
						MenuProps={{
							PaperProps: {
								style: {
									maxHeight: 400
								}
							}
						}}>
						{timezones.map((zone) => (
							<MenuItem key={zone} value={zone}>
								{zone}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>
			<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
				<Button variant="contained" color="primary" endIcon={<Send />} disabled={!isFormComplete} onClick={handleSubmit}> Создать</Button>
			</Box>

			<Snackbar open={errorLoadingTimezones} autoHideDuration={6000} onClose={() => setErrorLoadingTimezones(false)}>
				<Alert onClose={() => setErrorLoadingTimezones(false)} severity="error">
					Не удалось загрузить часовые пояса. Пожалуйста, попробуйте снова.
				</Alert>
			</Snackbar>
			<Snackbar open={isNoteAdded} autoHideDuration={6000} onClose={() => setIsNoteAdded(false)}>
				<Alert onClose={() => setIsNoteAdded(false)} severity="success">
					Запись успешно добавлена!
				</Alert>
			</Snackbar>
		</Box>
	);
};

export default NoteForm;
