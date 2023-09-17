import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import ActionTooltip from "@/components/action-tooltip";
import { cn } from "@/lib/utils";



interface NavigationItemProps{
    imageUrl:string;
    id:string;
    name:string
}

const NavigationItem = ({imageUrl, id, name}:NavigationItemProps) => {

    const params =  useParams();
    const router = useRouter();

    return (
        <ActionTooltip side="right" align="center" label={name}>
          <button onClick={()=>{}}
           className="group relative flex items-center" >
          <div className={cn("absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
           params?.serverId !==id && "group-hover:h-[20px]",
           params?.serverId ===id ? "h-[36px]": "h-[8px]"
            )}/>
          

           </button>
        </ActionTooltip>
      );
}
 
export default NavigationItem;