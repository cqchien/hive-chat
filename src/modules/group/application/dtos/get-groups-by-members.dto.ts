import { StringField } from 'decorators/field.decorators';

export class GetGroupMembersDto {
  @StringField({
    each: true,
  })
  memberIds!: string[];
}
