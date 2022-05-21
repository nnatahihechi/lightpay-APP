import dotenv from "dotenv";

dotenv.config();

const getBalances = async (req: Request | any, res: Response) => {

  let email = req.email;

  try {

    const checkPassQuery = `SELECT id, mobile, email, fullname, password, status, "verifyToken" FROM "Users" WHERE email='${email}'`;

  } catch (error: String | String[] | any) {

    console.log(error.message)

  }
}

export default getBalances