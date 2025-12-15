import GuestActivity from "./Activity/GuestsActivity";
import GuestAppUsage from "./GuestAppUsage";
import GuestOffer from "./GuestOffer";
import GuestReview from "./GuestReview";
import GuestsBookings from "./GuestsBookings";
import GuestSearch from "./GuestSearch";
import GuestsFavorites from "./GuestsFavorites";
import GuestsProfile from "./GuestsProfile";
import Referrals from "./Referrals/Referrals";


export const TabsList = [[{
  label: "Profile",
  content: <GuestsProfile />
},
{
  label: "Bookings",
  content: <GuestsBookings />
},
{
  label: "Referrals",
  content: <Referrals />
},
{
  label: "Activity",
  content: <GuestActivity />
}],
[{
  label: "Search",
  content: <GuestSearch />
},
{
  label: "Favorites",
  content: <GuestsFavorites />
},
{
  label: "Reviews",
  content: <GuestReview />
},
{
  label: "Offers",
  content: <GuestOffer />
},
{
  label: "App Usage",
  content: <GuestAppUsage />
}]
]