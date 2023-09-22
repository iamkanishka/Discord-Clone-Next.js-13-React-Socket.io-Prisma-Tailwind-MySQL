import { Server } from '@prisma/client';
import { create } from 'zustand';

export type ModalType = "createServer" | "invite" | "editServer";

interface Modaldata{
    server?:Server
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
