import IUser from "../../interfaces/user.interface";

async function signup(userData: IUser) {}

async function isValidEmail(email: string) {}

async function isValidUsername(username: string) {}

async function login(
  { email, username }: { email: string; username: string },
  password: string
) {}
