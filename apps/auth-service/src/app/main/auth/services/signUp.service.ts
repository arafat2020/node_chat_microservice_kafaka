import { BadRequestException, Injectable } from "@nestjs/common";
import { DdbService } from "../../../lib/db/db.service";
import { CommonService } from "./common.service";
import { HashService } from "../../../lib/utils/hash.service";
import { ApiResponse, SignUpDto } from "@node-chat/shared";
import { JwtService } from "../../../lib/utils/jwt.service";

@Injectable()
export class SignUpService {
    constructor(
        private readonly dbService:DdbService,
        private readonly commonService: CommonService,
        private readonly hashService: HashService,
        private readonly jwtService: JwtService,
    ) { }

    public async signUp({
        email,
        name,
        password,
    }:SignUpDto): Promise<ApiResponse<Record<string, string>>> {
          const isEmailExist = await this.commonService.isEmailExist(email);
            if (isEmailExist.isExist ) {
              throw new BadRequestException('User with this email already exists');
            }
            if (isEmailExist?.user?.password === null) {
              throw new BadRequestException(
                'Wrong way to sign up. Did you sign up with Google or Facebook?'
              );
            }

            const newUser = await this.dbService.profile.create({
              data: {
                email,
                name,
                password: await this.hashService.getHashed(password),
              },
            });

            return {
              data: {
                userId: newUser.id,
                email: newUser.email,
                name: newUser.name,
                token: await this.jwtService.generateToken({ id: newUser.id, email: newUser.email }),
              },
              message: 'User created successfully',
              success:true,
            };

    }
}