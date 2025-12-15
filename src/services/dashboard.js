import apiClient from "./api/apiClient"

const DASHBOARD_OVERVIEW = "/overview"

export const fetchDashboardOverview = async () => {
  const { data } = await apiClient.get(DASHBOARD_OVERVIEW)
  return data
}

