import { PrismaClient } from '@prisma/client'

type Constructor<T = {}> = new (...args: any[]) => T;

export const Authenticatable = <TBase extends Constructor>(Base: TBase) => {
    return class extends Base {
        public prisma: PrismaClient;

        constructor(...args: any[]) {
            super(...args);
            this.prisma = new PrismaClient();
        }

        async createToken(userId: number, token: string) {
            return this.prisma.token.create({
                data: {
                    token,
                    user: {
                        connect: {
                            id: userId,
                        },
                    },
                },
            });
        }

        async getToken (token: string) {
            return this.prisma.token.findUnique({
                include: {
                    user: true,
                },
                where: {
                    token,
                },
            });
        }
    };
}
