import { Dispatch, ReactNode, SetStateAction } from "react";
import { ISelectedCategory } from "../page";

interface ITabsButton {
  tab: ISelectedCategory;
  selectedTab: ISelectedCategory;
  setSelectedTab: Dispatch<SetStateAction<ISelectedCategory>>;
}

export default function TabsButton({
  tab,
  selectedTab,
  setSelectedTab,
}: ITabsButton): ReactNode {
  const isSelected: boolean = selectedTab.id === tab.id;

  return (
    <li>
      <button
        type="button"
        onClick={() => setSelectedTab(tab)}
        className={`${
          isSelected ? "bg-mypurple text-white" : "bg-gray-100 text-mygray-300"
        } rounded-full px-4 py-2 cursor-pointer`}
      >
        {tab.name}
      </button>
    </li>
  );
}
