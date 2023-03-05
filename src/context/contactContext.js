import { createContext } from "react";

export const ContactContext = createContext({
  //اینجا میتوانیم مقدار پیش فرض بدهیم
  loading: false,
  setLoading: () => {},
  contact: {},
  setContacts: () => {},
  setContact: () => {},
  contacts: [],
  filteredContacts: [],
  // errors: [],
  // contactQuery: {},
  groups: [],
  setFilteredContacts: () => {},
  setContactQuery: () => {},
  onContactChange: () => {},
  deleteContact: () => {},
  updateContact: () => {},
  contactSearch: () => {},
  createContact: () => {},
});
