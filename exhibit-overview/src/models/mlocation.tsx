export const mlocation: any = (location: any) => {
  return {
    state: location,
    reducers: {
      changeLocation(state: any, location: any) {
        return location;
      }
    },
    effects: (dispatch: any) => ({})
  };
};
