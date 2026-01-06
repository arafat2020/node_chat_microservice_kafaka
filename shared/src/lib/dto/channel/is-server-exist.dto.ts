import { UUIDField } from "../../decorator/UUIDField.decorator.js";

export class IsServerExistsDto {
  @UUIDField('UUID of the server', '550e8400-e29b-41d4-a716-446655440000')
  serverId: string;

  @UUIDField('UUID of the channel', '660e8400-e29b-41d4-a716-446655440000')
  channelId: string;
}
