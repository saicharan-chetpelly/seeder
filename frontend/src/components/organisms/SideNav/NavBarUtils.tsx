import Home from "../../../../public/assets/icons/home.svg";
import ActiveHome from "../../../../public/assets/icons/activeHome.svg";
import Coin from "../../../../public/assets/icons/coin.svg";
import ActiveCoin from "../../../../public/assets/icons/activeCoin.svg";
export interface NavBarType {
  title: string;
  icon: string;
  activeIcon: string;
}
export const NAV_BAR_ITEMS = [
  {
    title: "Home",
    icon: Home,
    activeIcon: ActiveHome,
  },
  {
    title: "Cash Acceleration",
    icon: Coin,
    activeIcon: ActiveCoin,
  },
];
export const NAV_BAR_FOOTER = "Watch how to";
