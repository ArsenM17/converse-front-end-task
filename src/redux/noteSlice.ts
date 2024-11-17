import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Note {
	text: string;
	sign: string;
	tz: string;
	date: Record<string, any>;
}

interface NoteState {
	notes: Note[];
}

const storageNotes = localStorage.getItem('notes');
const initialState: NoteState = {
	notes: storageNotes ? JSON.parse(storageNotes) : []
}

const noteSlice = createSlice({
	name: 'notes',
	initialState,
	reducers: {
		addNote: (state, action: PayloadAction<Note>) => {
			state.notes.push(action.payload);

			localStorage.setItem('notes', JSON.stringify(state.notes));
		},
	},
});

export const { addNote } = noteSlice.actions;
export default noteSlice.reducer;
