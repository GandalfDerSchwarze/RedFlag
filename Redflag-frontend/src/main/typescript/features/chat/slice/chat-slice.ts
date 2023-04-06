import {createAction, createSlice, Reducer} from "@reduxjs/toolkit";

type SliceState = {
    statusMessages: string,
    messages: Message[]
}

const initialState: SliceState = {
    statusMessages: "start",
    messages: []
}

type SliceProjection = {
    chat: SliceState
}
export const chatSlice = createSlice({
    name: 'chat',
    initialState: initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(generateTempMessages, (state, action) => {
                state.messages.push(
                    {
                        content:"test",
                        timestamp:1,
                        sender:"leon",
                        receiver:"jan"
                    },
                    {
                        content:"test2",
                        timestamp:1,
                        sender:"jan",
                        receiver:"leon"
                    },
                    {
                        content:"test3",
                        timestamp:1,
                        sender:"leon",
                        receiver:"jan"
                    }
                )
            })
})

export const chatReducer = chatSlice.reducer as Reducer<SliceState>


export const generateTempMessages = createAction<void>('generateTempMessages');

export const selectMessages = (state: SliceProjection) => {
    return state.chat.messages;
}