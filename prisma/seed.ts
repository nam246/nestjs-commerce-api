// prisma/seed.ts

import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { title } from 'process';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  const salt = await bcrypt.genSalt();
  const hashPwd = await bcrypt.hash('admin', salt);

  //  create user
  // const admin = await prisma.user.create({
  //   data: {
  //     username: 'admin',
  //     password: hashPwd,
  //     salt: salt,
  //     name: 'quan tri vien',
  //     phone: '01238699027',
  //     email: 'admin@admin.com',
  //     role: Role.ROOT,
  //   },
  // });

  // create post
  const post1 = await prisma.post.create({
    data: {
      title: "What's new in Prisma? (Q1/22)",
      slug: 'what-new-in-prisma',
      excerpt: 'Our engineers have been working hard, issuing new releases with many improvements...',
      content:
        'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
      public: true,
      userCreated: 1
    },
  });

  // create posts category
  const cate1 = await prisma.postsCategory.create({
    data: {
      name: 'default category',
      slug: 'default-category',
      public: true,
      userCreated: 1,
      parentId: 0 || null
    }
  })

  const cate2 = await prisma.postsCategory.create({
    data: {
      name: 'humour',
      slug: 'humour',
      public: true,
      userCreated: 1,
      parentId: 0 || null
    }
  })

  console.log("DB is seeded!");
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
