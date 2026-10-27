import { UserService } from "./user.service";
import { APIResponse } from "../../lib/APIResponse";
import { Body, Controller, Get, Path, Post, Route, SuccessResponse, Tags, Patch, Delete } from "tsoa";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserEntity } from "./user.entity";
import { UpdateUserDto } from "./dto/updateUser.dto";

@Route("users")
@Tags("Users")
export class UserController extends Controller {
  private readonly userService = new UserService();

  @Post()
  @SuccessResponse(201, "Created")
  public async create(@Body() body: CreateUserDto): Promise<APIResponse<UserEntity>> {
    const user = await this.userService.createUser(body);
    this.setStatus(201);
    return new APIResponse("User Created Successfully", 201, user);
  }

  @Get("/api")
  public async findAll(): Promise<APIResponse<UserEntity[]>> {
    const users = await this.userService.getAllUsers();
    return new APIResponse("Users Fetched Successfully", 200, users);
  }

  @Get("/api/email/{email}")
  public async findByEmail(@Path() email: string): Promise<APIResponse<UserEntity>> {
    const user = await this.userService.findByEmail(email);
    return new APIResponse("User Fetched Successfully", 200, user);
  }

  @Get("{id}")
  public async findById(@Path() id: string): Promise<APIResponse<UserEntity>> {
    const user = await this.userService.findById(id);
    return new APIResponse("User Fetched Successfully", 200, user);
  }

  @Patch("{id}")
  public async update( @Path() id: string, @Body() body: UpdateUserDto): Promise<APIResponse<UserEntity>> {
    const user = await this.userService.update(id, body);
    return new APIResponse("User Updated Successfully", 200, user);
  }

  @Delete("{id}")
  public async delete(@Path() id: string): Promise<APIResponse<UserEntity>> {
    const user = await this.userService.delete(id);
    return new APIResponse("User Deleted Successfully", 200, user);
  }
}