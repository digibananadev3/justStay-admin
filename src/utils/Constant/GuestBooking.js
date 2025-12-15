import { LuDollarSign } from "react-icons/lu";
import { GiCancel } from 'react-icons/gi';
import { AiOutlineBarChart } from 'react-icons/ai';
import { FiCalendar } from 'react-icons/fi';
import { BiTimeFive } from 'react-icons/bi';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';

export const BookingTilesArr = [
  {
    title: "Avg Booking Value",
    symbol: LuDollarSign,
    totalNumber: 5023,
    borderColor: "border-blue-200",
    bgColor: "bg-blue-50",
    fontTitleColor: "text-[#1447E6]",
    access: "avgBookingValue"
  },
  {
    title: "Cancellation Rate",
    symbol: GiCancel,
    totalNumber: 5023,
    borderColor: "border-[#E9D4FF]",
    bgColor: "bg-[#F3E8FF]",
    fontTitleColor: "text-[#8200DB]",
    access: "cancellationRate"
  },
  {
    title: "Monthly Frequency",
    symbol: AiOutlineBarChart,
    totalNumber: 5023,
    borderColor: "border-[#B9F8CF]",
    bgColor: "bg-[#DCFCE7]",
    fontTitleColor: "text-[#008236]",
    access: "monthlyFrequency"
  },
  {
    title: "Total Bookings",
    symbol: FiCalendar,
    totalNumber: 5023,
    borderColor: "border-[#FFD6A7]",
    bgColor: "bg-[#FFEDD4]",
    fontTitleColor: "text-[#CA3500]",
    access: "totalBookings"
  }
]

export const BookingTimelineArr = [
  {
    title: "Upcoming",
    symbol: FiCalendar,
    totalNumber: "3",
    borderColor: "border-[#DBEAFE]",
    bgColor: "bg-blue-100",
    fontTitleColor: "text-[#1447E6]",
    access: "upcoming"
  },
  {
    title: "Ongoing",
    symbol: BiTimeFive,
    totalNumber: "3",
    borderColor: "border-[#FEF9C2]",
    bgColor: "bg-[#FEFCE8]",
    fontTitleColor: "text-[#A65F00]",
    access: "ongoing"
  },
  {
    title: "Compeleted",
    symbol: IoIosCheckmarkCircleOutline,
    totalNumber: "3",
    borderColor: "border-[#DCFCE7]",
    bgColor: "bg-[#F0FDF4]",
    fontTitleColor: "text-[#008236]",
    access: "completed"
  },
  {
    title: "Cancelled",
    symbol: GiCancel,
    totalNumber: "3",
    borderColor: "border-[#FFE2E2]",
    bgColor: "bg-[#FEF2F2]",
    fontTitleColor: "text-[#C10007]",
    access: "cancelled"
  }
]