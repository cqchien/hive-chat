import { StringField } from 'decorators/field.decorators';

export class GetConversationByParticipantsDto {
  @StringField({
    each: true,
  })
  participantIds!: string[];
}
