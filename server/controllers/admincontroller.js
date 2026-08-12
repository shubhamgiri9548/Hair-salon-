import Appointment from "../models/Appointment.js";
import Customer from "../models/Customer.js";


export const getDashboard = async (req, res, next) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);

    const dateFilter = {
      startTime: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    };

    const totalAppointments =
      await Appointment.countDocuments(dateFilter);

    const customerIds =
      await Appointment.distinct(
        "customer",
        dateFilter
      );

          const revenueResult = await Appointment.aggregate([
        {
          $match: dateFilter,
        },
        {
          $group: {
            _id: null,
            totalRevenue: {
              $sum: "$price",
            },
          },
        },
      ]); 

    const totalCustomers = customerIds.length;
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

    return res.status(200).json({
      stats: {
        totalCustomers,
        totalAppointments,
        totalRevenue,
      },
    });
  } catch (error) {
    next(error);
  }
};



// Get all customers
export const getCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find()
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      customers,
    });
  } catch (error) {
    next(error);
  }
};


// Get all appointments
export const getAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find()
      .populate("customer", "name phone")
      .populate("service", "name price duration")
      .sort({ startTime: 1 });

    return res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    next(error);
  }
};