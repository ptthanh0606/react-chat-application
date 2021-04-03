export const API_URL =
  "http://chat-application.us-east-2.elasticbeanstalk.com/api/";

export const login = API_URL + "user/login";

export const getContacts = function (uuid) {
  return API_URL + "contact?uuid=" + uuid;
};

export const addContact = function (uuid) {
  return API_URL + "contact/addcontact?uuid=" + uuid;
};

export const getConversations = function (uuid) {
  return API_URL + "conversation?uuid=" + uuid;
};

export const startConversation = function (uuid) {
  return API_URL + "conversation/startConversation?uuid=" + uuid;
};

export const sendMessage = function (conversationId) {
  return API_URL + "message/sendMessage?conversationId=" + conversationId;
};

export const getMessages = function (conversationId, uuid) {
  return API_URL + "message?conversationId=" + conversationId + "&uuid=" + uuid;
};
