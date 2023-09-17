"use client";

import { Plus } from "lucide-react";
import ActionTooltip from "@/components/action-tooltip";

const NavigationAction = () => {
  return (
    <div>
      <ActionTooltip side="right" align="center" label="Add a Server">
        <button className="group flex items-center">
          <div
            className="flex items-center justify-center mx-3 h-[48px] w-[48px] rounded-[24px]  ground-hover:rounded-[16px] transition-all
        overflow-hidden  bg-background dark:bg-neutral-700 group-hover:bg-emerald-500
        "
          >
            <Plus
              className="group-hover:text-white transition text-emerald-500"
              size={25}
            ></Plus>
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};

export default NavigationAction;
