import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const users = this.usersRepository.list();

    const isAdmin = users.find((user) => user.id === user_id);

    if (!isAdmin) {
      throw new Error("User not found");
    }

    if (!isAdmin.admin) {
      throw new Error("User not admin");
    }

    return users;
  }
}

export { ListAllUsersUseCase };
