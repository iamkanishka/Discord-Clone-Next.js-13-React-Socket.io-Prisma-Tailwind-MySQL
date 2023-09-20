import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { ChannelType } from "@prisma/client";

import { redirect } from "next/navigation";

import ServerHeader from "@/components/servers/server-header";

interface ServerSideProps {
  serverId: string;
}
const ServerSidebar = async ({ serverId }: ServerSideProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  if(!server){
    return redirect("/")
  }

  const textChannels =  server?.channels.filter((channel)=>channel.type === ChannelType.TEXT);
  const audioChannels =  server?.channels.filter((channel)=>channel.type === ChannelType.AUDIO);
  const vedioChannels =  server?.channels.filter((channel)=>channel.type === ChannelType.VIDEO);
  const members = server?.members.filter((member)=>{member.profileId !== profile.id});

  const role = server?.members.find((member)=>member.profileId === profile.id)?.role;
  return (
     <ServerHeader server={server} role={role}/>
  );
};

export default ServerSidebar;
