import axios from "axios";

// const CHAT_BASE_URL = "http://13.203.230.175:4000";
export const CHAT_BASE_URL = "http://localhost:3000";
// const CHAT_BASE_URL = "https://qwiz15.in";

// API paths
const CREATE_SESSION = "/api/chat-support/session";
const LIST_USER_SESSIONS = "/api/chat-support/sessions";
const LIST_MESSAGES = "/api/chat-support/messages";
const SEND_MESSAGE = "/api/chat-support/send";
const CLOSE_SESSION = "/api/chat-support/close";
const ADMIN_LIST_ALL = "/api/chat-support/admin/all/chats";

// Axios instance
const chatApiClient = axios.create({
  baseURL: CHAT_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

/* ============================
   USER APIs
============================ */

// Create new chat session
export const createChatSession = async (payload) => {
  try {
    const { data } = await chatApiClient.post(CREATE_SESSION, payload);
    return data;
  } catch (error) {
    throw error;
  }
};

// List chat sessions for a user
export const listChatSessions = async (userId, status = "Open", page = 1, limit = 20) => {
  try {
    const { data } = await chatApiClient.get(LIST_USER_SESSIONS, {
      params: { userId, status, page, limit }
    });
    return data;
  } catch (error) {
    throw error;
  }
};

// Get messages for a session
export const listChatMessages = async (sessionId, page = 1, limit = 50) => {
  try {
    const { data } = await chatApiClient.get(`${LIST_MESSAGES}/${sessionId}`, {
      params: { page, limit }
    });
    return data;
  } catch (error) {
    throw error;
  }
};

// Send a message
export const sendChatMessage = async (sessionId, payload) => {
  try {
    const { data } = await chatApiClient.post(`${SEND_MESSAGE}/${sessionId}`, payload);
    return data;
  } catch (error) {
    throw error;
  }
};

// Close a session
export const closeChatSession = async (sessionId) => {
  try {
    const { data } = await chatApiClient.put(`${CLOSE_SESSION}/${sessionId}`);
    return data;
  } catch (error) {
    throw error;
  }
};

/* ============================
   ADMIN APIs
============================ */

// Admin: list all chats
export const adminListAllChats = async (status = "Open") => {
  try {
    const { data } = await chatApiClient.get(ADMIN_LIST_ALL, {
      params: { status }
    });
    return data;
  } catch (error) {
    throw error;
  }
};
