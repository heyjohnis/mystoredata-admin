import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// Define a type for the slice state
interface ConfigState {
  name: string;
  description: string;
  url: string;
  layout: string;
  collapsed: boolean;
  rightSidebar: boolean;
  background: string;
}

// Define the initial state using that type
const initialState: ConfigState = {
  name: "마이스토어데이터",
  description: "마이스토어데이터 통합관리 페이지",
  url: "https://d-board-nextjs.mobifica.com",
  layout: "layout-1",
  collapsed: false,
  rightSidebar: false,
  background: "light",
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setConfig: (state, action: PayloadAction<Partial<ConfigState>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const {setConfig} = configSlice.actions;

export default configSlice.reducer;
