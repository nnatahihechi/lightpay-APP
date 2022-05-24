const web3 = require('web3');
import dotenv from "dotenv";

dotenv.config();

export const getBalances = async (req: Request | any, res: Response) => {

  let address = req.params;

  try {

    let balance = await web3.eth.getBalance(address)

    balance = (balance/1000000000000000000)

  } catch (error: String | String[] | any) {

    console.log(error.message)

  }
}