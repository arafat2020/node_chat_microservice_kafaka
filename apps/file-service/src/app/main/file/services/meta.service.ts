import { Injectable } from "@nestjs/common";
import { DdbService } from "../../../lib/db/db.service";

@Injectable()
export class MetaService {
    constructor(
        private readonly dbService: DdbService
    ) {}
}