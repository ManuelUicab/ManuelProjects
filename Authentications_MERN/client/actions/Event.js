import Axios from "axios";

export function createEvent(event) {
  return dispatch => {
    return Axios.post('/api/events', event);
  };
}