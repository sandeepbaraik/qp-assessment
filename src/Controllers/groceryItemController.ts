import { Request, Response } from 'express';
import {getAllGroceryItems, createGroceryItem, updateGroceryItem, deleteGroceryItem, orderGroceryItems} from '../Services/groceryItemService';

export const getAllGrocery = async(req: Request, res: Response) => {
  try {
    let response = await getAllGroceryItems();
    res.status(200).send(response);
  } catch(err) {
    console.log('getAllGrocery err:', err);
    res.status(500).json({ error: 'Internal server error' })
  }
};

export const createGrocery = async(req: Request, res: Response) => {
  try {
    let response: any = await createGroceryItem(req.body);    
    res.status(200).json({ message: 'Grocery item created successfully'});;
  } catch(err) {
    console.log('createGrocery err: ', err);
    res.status(500).json({ error: 'Internal server error' })
  }
};

export const updateGrocery = async(req: Request, res: Response) => {
  try {
    let response: any = await updateGroceryItem(req.body, req.params);    
    res.status(200).json({ message: 'Grocery item updated successfully'});;
  } catch(err) {
    console.log('updateGrocery err: ', err);
    res.status(500).json({ error: 'Internal server error' })
  }
};

export const deleteGrocery = async(req: Request, res: Response) => {
  try {
    let response: any = await deleteGroceryItem(req.params);    
    res.status(200).json({ message: 'Grocery item deleted successfully'});
  } catch(err) {
    console.log('deleteGrocery err: ', err);
    res.status(500).json({ error: 'Internal server error' })
  }
};

export const orderGrocery = async(req: Request, res: Response) => {
  try {
    let response: any = await orderGroceryItems(req.params, req.body);    
    res.status(200).json(response);
  } catch(err) {
    console.log('deleteGrocery err: ', err);
    res.status(500).json({ error: 'Internal server error' })
  }
};

