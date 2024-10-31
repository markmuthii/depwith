import { isValidObjectId } from "mongoose";
import { Balance } from "../database/Models/Balance.js";

// TODO: When roles are added, make sure that if the loggedInUser is not the same as the user whose balance is being requested (userWeAreInterestedIn), then the logged in user must have the authority to view other users' balances
export const getUserBalance = async (req, res) => {
  try {
    // {
    //   userId: "", // ID of the user making the request (user who is logged in)
    //   params: {
    //     userId: "" // ID of the user we want to get the balance of
    //   }
    // }
    const { userId: userWeAreInterestedIn } = req;

    if (!isValidObjectId(userWeAreInterestedIn)) {
      return res.status(400).json({
        success: false,
        message: "Deformed ID Passed",
      });
    }

    const userBalance = await Balance.findOne({ user: userWeAreInterestedIn });

    if (!userBalance) {
      return res.status(400).json({
        success: false,
        message: "User with that ID does not exist",
      });
    }

    res.json({
      success: true,
      balance: userBalance.balance, // IF there is a userBalance.balance (it is defined), then use that. If not, then 0
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
