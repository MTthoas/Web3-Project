import { Request, Response } from 'express';
import UserModel, { User } from '../model/user';
import TransactionModel, { Transaction } from '../model/transaction';

export default class MarketPlaceController {

static createUser = async (req: Request, res: Response) => {
  try {
    const newUser: User = new UserModel({ 
        address: req.body.address,
        profilePicture: req.body.profilePicture
     });
    await newUser.save();

    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating user.');
  }
};

static createTransaction = async (req: Request, res: Response) => {
    try {
      const newTransaction: Transaction = new TransactionModel({
        from: req.body.from,
        to: req.body.to,
        amount: req.body.amount,
        tokenId: req.body.tokenId
      });
      await newTransaction.save();
  
      const transactions: Transaction[] = await TransactionModel.find({ tokenId: req.body.tokenId }).sort({ timestamp: -1 });;
      
      res.json(transactions);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating transaction.');
    }
  };
  

static getAllTransactions = async (req: Request, res: Response) => {
    try {
      const transactions: Transaction[] = await TransactionModel.find().sort({ timestamp: -1 });  ;
  
      res.json(transactions);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error getting transactions.');
    }
  };


static getNftTransactions = async (req: Request, res: Response) => {

    try {
        const tokenId: string = req.params.tokenId;

        const transactions: Transaction[] = await TransactionModel.find({ tokenId: tokenId })
        .sort({ timestamp: -1 });  // -1 for sorting in descending order

        if (transactions.length > 0) {
        res.json(transactions);
        } else {
        res.status(404).send('No transactions found for this token.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error getting transactions.');
    }
};

static deleteAllTransactions = async (req: Request, res: Response) => {
    try {
      await TransactionModel.deleteMany({}); // Deletes all transactions
  
      res.status(200).send('All transactions deleted successfully.');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error deleting transactions.');
    }
  };
  

  

static getUserData = async (req: Request, res: Response) => {
    try {
      const userData: User | null = await UserModel.findOne({ address: req.params.address });
  
      if (userData) {
        res.json(userData);
      } else {
        res.status(404).send('User not found.');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error getting user data.');
    }
  };
  

  static getAllUsers = async (req: Request, res: Response) => {
    try {
      const users: User[] = await UserModel.find({});
  
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error getting users.');
    }
  };
  

}