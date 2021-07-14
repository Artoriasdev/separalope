import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  modalOpen: false,
  modalScoreOpen: false,
  scoreData: {},
  error: false,
  modalMessage: "",
  categories: [],
  searchCategories: [],
  fillableUser: true,
  userType: true,
  showBack: true,
  expanded: false,
  footerType: "",
  hideCategoryBar: false,
  subCategorySelected: "",
  events: [],
  searchEvents: [],
  eventSelected: "",
  loading: true,
  data: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUserType: (state, action) => {
      state.userType = action.payload.userType;
      return state;
    },
    setSubCategory: (state, action) => {
      state.subCategorySelected = action.payload.subCategorySelected;
      return state;
    },
    setEvent: (state, action) => {
      state.eventSelected = action.payload.eventSelected;
      return state;
    },
    setExpanded: (state, action) => {
      state.expanded = action.payload.expanded;
      return state;
    },
    setFooterType: (state, action) => {
      state.footerType = action.payload.footerType;
      return state;
    },
    setShowBack: (state, action) => {
      state.showBack = action.payload.showBack;
      return state;
    },
    setHideCategoryBar: (state, action) => {
      state.hideCategoryBar = action.payload.hideCategoryBar;
      return state;
    },
    setModalOpen: (state, action) => {
      state.modalOpen = action.payload.modalOpen;
      return state;
    },
    fillEvents: (state, action) => {
      state.events.push(action.payload);
      return state;
    },
    setEvents: (state, action) => {
      state.events = action.payload;
      return state;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
      return state;
    },
    setFillableUser: (state, action) => {
      state.fillableUser = action.payload;
      return state;
    },
    setAppSlice: (state, action) => {
      state = { ...state, ...action.payload };
      return state;
    },
  },
});

export const appReducer = appSlice.reducer;
export const {
  setUserType,
  fillEvents,
  setEvents,
  setCategories,
  setExpanded,
  setSubCategory,
  setEvent,
  setHideCategoryBar,
  setShowBack,
  setFooterType,
  setAppSlice,
  setFillableUser,
  setModalOpen,
} = appSlice.actions;
