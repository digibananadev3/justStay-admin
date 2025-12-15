import apiClient from "./api/apiClient"

const GUEST_USER_LIST = "/guests"
const GUEST_USER_STATS = "/guests/stats"

export const handleGuestUserList = async () => {
  const { data } = await apiClient.get(GUEST_USER_LIST)
  return data
}

export const handleFilterGuestUserList = async (params) => {
  const { data } = await apiClient.get(GUEST_USER_LIST, {params})
  return data
}

export const fetchStats = async () => {
  const { data } = await apiClient.get(GUEST_USER_STATS)
  return data
}

export const fetchGuestData = async (id) => {
  const { data } = await apiClient.get(`${GUEST_USER_LIST}/${id}`)
  return data
}

export const fetchGuestBookings = async (id) => {
  const { data } = await apiClient.get(`${GUEST_USER_LIST}/${id}/bookings/summary`)
  return data
}

export const fetchGuestBookingsList = async (id) => {
  const { data } = await apiClient.get(`${GUEST_USER_LIST}/${id}/bookings`)
  return data
}

