import { prisma } from "../db.js"

export class HeroModel {
    static async getAll () {
        try {
            const heroes = prisma.hero.findMany({
                include: {
                    power: true,
                    villain: true
                }
            })
            return heroes
        } catch (error) {
            throw error
        }
    }
    static async getById ({ id }) {
        try {
            const heroes = await prisma.hero.findFirst({
                where: {
                    id: id
                },
                include: {
                    power: true,
                    villain: true
                }
            })
            return heroes
        } catch (error) {
            console.error(error);
            throw error
        }
    }
    static async update ({ id, name }) {
        try {
            const hero = await prisma.hero.update({
                where: {
                    id: id
                },
                data: {
                    name
                },
                include: {
                    power: true,
                    villain: true
                }
            })
            return hero
        } catch (error) {
            throw error
        }
    }
    static async post ({name, power}) {
        try {
            const heroes = prisma.hero.create({
                data: {
                    name: name,
                    power: {
                        connectOrCreate: {
                            where: {
                                name: power
                            },
                            create: {
                                name: power
                            }
                        },
                    }
                },
                include: {
                    power: true,
                    villain: true
                }
            })
            return heroes
        } catch (error) {
            throw error
        }
    }
    static async addPower ({ heroId, powerId }) {
        try {
            const hero = prisma.hero.update({
                where: {
                    id: heroId
                },
                data: {
                    power: {
                        connect: {id: powerId}
                    }
                },
                include: {
                    power: true,
                    villain: true
                }
            })
            return hero
        } catch (error) {
            throw error
        }
    }
    static async removePower ({ heroId, powerId }) {
        try {
            const hero = prisma.hero.update({
                where: {
                    id: heroId
                },
                data: {
                    power: {
                        disconnect: {id: powerId}
                    }
                },
                include: {
                    power: true,
                    villain: true
                }
            })
            return hero
        } catch (error) {
            throw error
        }
    }
}