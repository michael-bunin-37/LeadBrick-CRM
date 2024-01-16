import {ProjectReqDto, ProjectResDto} from "./project"

export interface InviteLinkResDto extends Omit<ProjectResDto, "info" | "photo"> {}
