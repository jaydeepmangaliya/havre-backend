import * as dashboardService from "../service/dashboard-service.js";


export const getDashboardAnalytics = async (req, res) => {

    const result = await dashboardService.getDashboardAnalytics();

    res.status(200).json({success: true, data: result.data});

};
