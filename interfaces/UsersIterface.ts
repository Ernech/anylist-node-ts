import { Optional } from 'sequelize'

export interface UserIntpuInterface{
    id?: string;
    name: string;
    email: string;
    password: string;
    roles: string;
    status: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UsersInput extends Optional<UserIntpuInterface, 'id' | 'createdAt' | 'updatedAt'>{}
export interface IngredientOuput extends Required<UserIntpuInterface> {}
