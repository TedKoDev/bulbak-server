import { PartialType } from '@nestjs/mapped-types';
import { CreateHotIssueDto } from './create-hot-issue.dto';

export class UpdateHotIssueDto extends PartialType(CreateHotIssueDto) {}
