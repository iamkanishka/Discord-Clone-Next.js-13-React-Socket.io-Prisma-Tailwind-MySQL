import { Channel, ChannelType, Server } from '@prisma/client';
import { create } from 'zustand';

export type ModalType = "createServer" | "invite" | "editServer" | "members" | "createChannel" | "leaveServer" | "deleteServer" | "deleteChannel" | "editChannel";

interface Modaldata{
    server?:Server,
    channelType?:ChannelType
    channel?:Channel

}

interface ModalStore{
    type: ModalType | null;
    data:Modaldata;
    isOpen:boolean;
    onOpen:(type:ModalType, data?:Modaldata) => void;
    onClose:() => void;
}

export const useModal = create<ModalStore>((set)=>({
    type:null,
    isOpen:false,
    data:{},
    onOpen:(type, data ={})=>set({isOpen:true, type, data}),
    onClose:()=>set({isOpen:false, type:null})
}))
