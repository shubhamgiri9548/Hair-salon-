import Appointment from "../models/Appointment.js";
import Customer from "../models/Customer.js";
import Service from "../models/Service.js";


// Create an appointment
export const createAppointment = async (req, res, next) => {
  try {
    const {
      name,
      phone,
      serviceId,
      startTime,
    } = req.body;

    // 1. Validate required fields
    if (!name || !phone || !serviceId || !startTime) {
      return res.status(400).json({
        success: false,
        message: "Name, phone, service and start time are required",
      });
    }

    // 2. Find the service
    const service = await Service.findById(serviceId);

    if (!service || !service.isActive) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // 3. Convert start time into Date
    const appointmentStart = new Date(startTime);

    if (isNaN(appointmentStart.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid start time",
      });
    }

    // 4. Calculate end time using service duration
    const appointmentEnd = new Date(
      appointmentStart.getTime() + service.duration * 60 * 1000
    );

    // 5. Check appointment conflict
    const conflictingAppointment = await Appointment.findOne({
      status: "confirmed",

      startTime: {
        $lt: appointmentEnd,
      },

      endTime: {
        $gt: appointmentStart,
      },
    });

    if (conflictingAppointment) {
      return res.status(409).json({
        success: false,
        message: "This time slot is already booked",
      });
    }

    // 6. Find existing customer
    let customer = await Customer.findOne({ phone });

    // 7. Create customer if doesn't exist
    if (!customer) {
      customer = await Customer.create({
        name,
        phone,
      });
    } else {
      // Update name if customer changes it
      customer.name = name;
      await customer.save();
    }

    // 8. Create appointment
    const appointment = await Appointment.create({
      customer: customer._id,
      service: service._id,
      price: service.price,
      startTime: appointmentStart,
      endTime: appointmentEnd,
      status: "confirmed",
      bookingType: "online",
    });

    // 9. Return response
    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment,
    });

  } catch (error) {
    next(error);
  }
};


// Get booked appointments for a particular date

export const getAvailability = async (req, res, next) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required",
      });
    }

    const selectedDate = new Date(date);

    if (isNaN(selectedDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date",
      });
    }

    // Start of selected day
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);

    // End of selected day
    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    const appointments = await Appointment.find({
      status: "confirmed",

      startTime: {
        $lt: endOfDay,
      },

      endTime: {
        $gt: startOfDay,
      },
    }).select("startTime endTime");

    return res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    next(error);
  }
};


export const getAppointments = async (req, res, next) => {
  try {
    const { date } = req.query;

    let filter = {};

    // If date is provided, filter appointments for that date
    if (date) {
      const startOfDay = new Date(`${date}T00:00:00`);
      const endOfDay = new Date(`${date}T23:59:59.999`);

      // Validate date
      if (
        isNaN(startOfDay.getTime()) ||
        isNaN(endOfDay.getTime())
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid date",
        });
      }

      filter.startTime = {
        $gte: startOfDay,
        $lte: endOfDay,
      };
    }

    const appointments = await Appointment.find(filter)
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
