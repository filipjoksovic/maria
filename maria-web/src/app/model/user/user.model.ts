import {WorkspaceModel} from "../workspace/workspace.model";

export type UserModel = {
  id:number;
  email:string;
  password:string;
  firstName:string;
  lastName:string;
  agree:boolean;

  workspaces:WorkspaceModel[];
}
