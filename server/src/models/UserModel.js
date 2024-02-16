import { prisma } from "../db.js"
export class UserModel {
    static async getAll () {
        const users = await prisma.user.findMany({
            include:{
                favoritesHeroes: true
            }
        });
        return users
    }
    static async getById ({ id }) {
        const user = await prisma.user.findFirst({
            where: {
                id: Number(id)
            },
            include: {
                favoritesHeroes: true
            }
        });
        return user
    }
    static async post ({ name, lastname, password, photo, email }) {
        const findUser = await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(findUser) return {message: "Usuario ya registrado"}
        const user = await prisma.user.create({
            data:{
                name,
                lastname,
                password,
                photo,
                email
            },
            include:{
                favoritesHeroes: true
            }
        })
        return user
    }
    static async addFav ({ id, heroId }) {
        const user = await prisma.user.update({
            where:{
                id: Number(id)
            },
            data:{
                favoritesHeroes:{
                    connect:{
                        id: Number(heroId),
                    }
                }
            },
            include:{
                favoritesHeroes:true
            }
        });
        return user
    }
    static async removeFav ({ id, heroId }) {
        const user = await prisma.user.update({
            where:{
                id: Number(id)
            },
            data:{
                favoritesHeroes:{
                    disconnect:{
                        id: Number(heroId)
                    }
                }
            },
            include:{
                favoritesHeroes: true
            }
        });
        return user
    }
}