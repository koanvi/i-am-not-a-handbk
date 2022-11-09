import { PrismaClient } from '@prisma/client'
import crypto from 'crypto';

const prisma = new PrismaClient()

async function main() {

  const alice = await prisma.user.upsert({
    where: { name: 'Alice' },
    update: {},
    create: {
      name: 'Alice',
      password: crypto.createHash('md5').update("123").digest("hex"),
      isAdmin:true,
    },

  })

  const bob = await prisma.user.upsert({

    where: { name: 'Bob' },
    update: {},
    create: {
      name: 'Bob',
      password: crypto.createHash('md5').update("123").digest("hex"),
      isAdmin: true,
    },

  })

  console.log({ alice, bob })

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {

    console.error(e)
    await prisma.$disconnect()
    process.exit(1)

  })