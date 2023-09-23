import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const { name, type } = await req.json();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const serverId = searchParams.get("serverId");

    if (!serverId) {
      return new NextResponse("ServerId not Found", { status: 400 });
    }

    if (name === "general") {
      return new NextResponse("Channel name cannot be 'general'", {
        status: 400,
      });
    }
    const server = await db.server.update({
      where: {
        id: serverId,
        members:{
            some:{
        profileId: profile.id,
        role:{
            in:[MemberRole.ADMIN, MemberRole.MODERATOR]
        }
                
            }
        }
      },
      data:{
        channels:{
            create:{
                profileId:profile.id,
                name:name,
                type:type
            }
        }
      }

    });

    return NextResponse.json(server)
  } catch (error) {
    console.log("[CHANNEL_POST]", error);
    return new NextResponse("Internal Error ", { status: 500 });
  }
}
