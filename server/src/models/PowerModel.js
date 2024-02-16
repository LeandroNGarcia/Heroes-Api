import { prisma } from "../db.js"

export class PowerModel {
    static async getAll () {
        const powers = await prisma.power.findMany({
            include:{
                hero: true
            }
        })
        return powers
    }
    static async getById ({ id }) {
        try {
            const power = await prisma.power.findFirst({
                where: {
                    id
                },
                include: {
                    hero: true
                }
            })
            return power
        } catch (error) {
            throw error
        }
    }
    static async create ({ name }) {
        try {
            const power = await prisma.power.create({
                data: {
                    name: name
                },
                include: {
                    hero: true
                }
            })
            return power
        } catch (error) {
            throw error
        }
    }
}