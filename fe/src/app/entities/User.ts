export interface User {
  id: string;
  name: string;
  email: string;
  accessLevel: "USER" | "ADM";
  rigs: {
    rig: {
      id: string;
      name: string;
      state?: string;
      isAtive?: boolean;
    };
  }[];
}
