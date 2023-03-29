export type UserType = {
  email: string;
  name: string;
  roles: RoleType[];
  id: number;
  avatarLink: string;
};

export type RoleType = "admin" | "user";
