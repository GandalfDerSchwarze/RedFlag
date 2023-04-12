import {createAction, createSlice, Reducer} from "@reduxjs/toolkit";
import {Contact} from "../model/contact";

type SliceState = {
    statusMessages: string,
    messages: Message[]
    statusContacs: string,
    contacs: Contact[]
}

const initialState: SliceState = {
    statusMessages: "start",
    messages: [],
    statusContacs: "start",
    contacs: []
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
                        content: "test",
                        timestamp: 1,
                        sender: "leon",
                        receiver: "jan"
                    },
                    {
                        content: "test2",
                        timestamp: 1,
                        sender: "jan",
                        receiver: "leon"
                    },
                    {
                        content: "test",
                        timestamp: 1,
                        sender: "leon",
                        receiver: "jan"
                    },
                    {
                        content: "test2",
                        timestamp: 1,
                        sender: "jan",
                        receiver: "leon"
                    },
                    {
                        content: "test",
                        timestamp: 1,
                        sender: "leon",
                        receiver: "jan"
                    },
                    {
                        content: "test2",
                        timestamp: 1,
                        sender: "jan",
                        receiver: "leon"
                    },
                    {
                        content: "test",
                        timestamp: 1,
                        sender: "leon",
                        receiver: "jan"
                    },
                    {
                        content: "test2",
                        timestamp: 1,
                        sender: "jan",
                        receiver: "leon"
                    },
                    {
                        content: "test",
                        timestamp: 1,
                        sender: "leon",
                        receiver: "jan"
                    },
                    {
                        content: "test2",
                        timestamp: 1,
                        sender: "jan",
                        receiver: "leon"
                    }, {
                        content: "test",
                        timestamp: 1,
                        sender: "leon",
                        receiver: "jan"
                    },
                    {
                        content: "test2",
                        timestamp: 1,
                        sender: "jan",
                        receiver: "leon"
                    },
                    {
                        content: "test",
                        timestamp: 1,
                        sender: "leon",
                        receiver: "jan"
                    },
                    {
                        content: "test2",
                        timestamp: 1,
                        sender: "jan",
                        receiver: "leon"
                    },
                    {
                        content: "test",
                        timestamp: 1,
                        sender: "leon",
                        receiver: "jan"
                    },
                    {
                        content: "test2",
                        timestamp: 1,
                        sender: "jan",
                        receiver: "leon"
                    },
                    {
                        content: "test",
                        timestamp: 1,
                        sender: "leon",
                        receiver: "jan"
                    },
                    {
                        content: "test2",
                        timestamp: 1,
                        sender: "jan",
                        receiver: "leon"
                    },
                    {
                        content: "test",
                        timestamp: 1,
                        sender: "leon",
                        receiver: "jan"
                    },
                    {
                        content: "test2",
                        timestamp: 1,
                        sender: "jan",
                        receiver: "leon"
                    },
                    {
                        content: "test",
                        timestamp: 1,
                        sender: "leon",
                        receiver: "jan"
                    },
                    {
                        content: "test2",
                        timestamp: 1,
                        sender: "jan",
                        receiver: "leon"
                    },
                    {
                        content: "test",
                        timestamp: 1,
                        sender: "leon",
                        receiver: "jan"
                    },
                    {
                        content: "test2",
                        timestamp: 1,
                        sender: "jan",
                        receiver: "leon"
                    },
                    {
                        content: "test",
                        timestamp: 1,
                        sender: "leon",
                        receiver: "jan"
                    },
                    {
                        content: "test2",
                        timestamp: 1,
                        sender: "jan",
                        receiver: "leon"
                    },
                    {
                        content: "test",
                        timestamp: 1,
                        sender: "leon",
                        receiver: "jan"
                    },
                    {
                        content: "test2",
                        timestamp: 1,
                        sender: "jan",
                        receiver: "leon"
                    }, {
                        content: "test",
                        timestamp: 1,
                        sender: "leon",
                        receiver: "jan"
                    },
                    {
                        content: "test2",
                        timestamp: 1,
                        sender: "jan",
                        receiver: "leon"
                    },
                    {
                        content: "test",
                        timestamp: 1,
                        sender: "leon",
                        receiver: "jan"
                    },
                    {
                        content: "test",
                        timestamp: 1,
                        sender: "leon",
                        receiver: "jan"
                    },
                    {
                        content: "test2",
                        timestamp: 1,
                        sender: "jan",
                        receiver: "leon"
                    },
                    {
                        content: "test3",
                        timestamp: 1,
                        sender: "leon",
                        receiver: "jan"
                    }
                )
            })
            .addCase(generateContacts, (state, action) => {
                state.contacs.push({
                    name: "jan",
                    status: "-.-"
                })
            })
})

export const chatReducer = chatSlice.reducer as Reducer<SliceState>

export const generateTempMessages = createAction<void>('generateTempMessages');
export const generateContacts = createAction<void>('generateContacts');

export const messageStatus = (state: SliceProjection) => {
    state.chat.statusMessages
}

export const contactStatus = (state: SliceProjection) => {
    state.chat.statusMessages
}

export const selectMessages = (state: SliceProjection) => {
    return state.chat.messages;
}

export const selectContacts = (state: SliceProjection) => {
    return state.chat.contacs;
}