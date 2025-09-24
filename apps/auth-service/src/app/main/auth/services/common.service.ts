import { Injectable } from "@nestjs/common";
import { DdbService } from "../../../lib/db/db.service";

@Injectable()
export class CommonService {
    constructor(
        private readonly dbService: DdbService,
    ) { }

    public async isEmailExist(email: string) {
        const user = await this.dbService.profile.findUnique({
            where: { email },
        });
        return {
            isExist:!!user,
            user
        };

    }
}