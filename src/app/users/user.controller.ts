import { UserService } from "./user.service";
import { APIResponse } from "../../lib/APIResponse";
import { Request, Response } from "express";
import { ApiError } from "../../lib/ApiError";

export class UserController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public create = async(req: Request, res: Response): Promise<void> => {
    const body = req.body;
    const user = await this.userService.createUser(body);
    res.status(200).json(new APIResponse("User Created Successfully", 201, user));
  }

  public findAll= async(_req: Request, res: Response): Promise<void> => {
    const users = await this.userService.getAllUsers();
    res.status(200).json(new APIResponse("User Fetched Successfully", 200, users));
  }

  public findByEmail = async(req: Request<{ email: string }>, res: Response): Promise<void> => {
    const { email } = req.params;
    const user = await this.userService.findByEmail(email);
    res.status(200).json(new APIResponse("User Fetched Successfully", 200, user));
  }

  public findById = async(req: Request<{ id: string }>, res: Response): Promise<void> => {
    const { id } = req.params;
    const user = await this.userService.findById(id);
    res.status(200).json(new APIResponse("User Fetched Successfully", 200, user));
  }

  public update = async(req: Request, res: Response): Promise<void> => {
    const body = req.body;
    const user = await this.userService.update(body);
    if(!user) throw new ApiError("User not found", 400);
    res.json( new APIResponse("User updated successfully", 200, user));
  }

  public delete = async(req: Request<{ id: string }>, res: Response): Promise<void> => {
    const { id } = req.params;
    const user = await this.userService.delete(id);
    res.json( new APIResponse("User deleted successfully", 200, user));
  }
}