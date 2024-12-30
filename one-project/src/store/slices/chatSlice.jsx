import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  typingUser: null,
  users: ["Ramez", "Rabab", "Qusai"],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push({
        id: Date.now(),
        ...action.payload,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      });
    },
    setTypingUser: (state, action) => {
      state.typingUser = action.payload;
    },
  },
});

export const { addMessage, setTypingUser } = chatSlice.actions;
export default chatSlice.reducer;