import { Global, Module } from "@nestjs/common";
import { FileService } from "./file/file.service";

@Global()
@Module({
    imports: [FileService],
})
export class LibModule {}