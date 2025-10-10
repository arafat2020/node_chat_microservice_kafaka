import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { DdbService } from "../../../lib/db/db.service";
import { CreateFileInstanceDto } from "../dto/file.dto";
import { PromiseMapResponseGeneric } from "@node-chat/shared";
import { FileInstance } from "../../../../generated/prisma";

@Injectable()
export class MetaService {
     constructor(
        private readonly dbService: DdbService,
    ) {}

    public async saveFileMetadata(fileMetadata: CreateFileInstanceDto): PromiseMapResponseGeneric<FileInstance> {
       try {
         const data  = await this.dbService.fileInstance.create({
            data: fileMetadata
        });
        return {
            data,
            message: 'File metadata saved successfully',
            success: true
        }
       } catch (error) {
        throw new InternalServerErrorException('Failed to save file metadata \n`' + String(error));
       }
    }
}