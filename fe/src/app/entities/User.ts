export interface User {
  id: string;
  name: string;
  email: string;
  accessLevel: "USER" | "ADM";
  rigs: [
    {
      rigId: string;
    }
  ];
}
