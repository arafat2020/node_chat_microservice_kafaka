import { BadRequestException, Injectable } from "@nestjs/common";
import { DdbService } from "../../../lib/db/db.service";
import { LeaveServerDto, PromiseMapResponseGeneric } from "@node-chat/shared";

@Injectable()
export class LeaveServerService{
    constructor(
        private readonly dbService: DdbService
    ){}

    public async leaveServer({serverId,userId}:LeaveServerDto): PromiseMapResponseGeneric<unknown>{
       try {
         const data = await this.dbService.server.update({
            where:{
                id: serverId,
                members:{
                    some:{
                        id: userId
                    }
                }
                },
                data:{
                    members:{
                        deleteMany:{
                            id: userId
                        }
                    }
                }
            }
        )
        return {
            data,
            message:"Member removed form server",
            success:true
        }
       } catch (error) {
        throw new BadRequestException(
                'Failed to update server \n`' + String(error)
              );
       }
    }
}