import InitialModal from "@/components/modals/initial-model";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

const SetupPage = async () => {
  //Getting user's Profile  
  const profile = await initialProfile();
 
  //Checking if user has server  
  const server = await db.server.findFirst({
    where:{
        members:{
            some:{
                profileId:profile.id
            }
        }
    }
  });
 
  // Redirecting to user to server, if user exist in server
  if(server){
   return redirect(`/servers/${server.id}`)
  }

    return ( 
        <div>
            <InitialModal/>
        </div>
     );
}
 
export default SetupPage;