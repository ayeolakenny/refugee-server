import { PrismaClient, UserRole } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  const admins = [
    {
      name: 'Super Admin',
      email: 'superadmin@ncfrmi.com',
      role: UserRole.SUPER_ADMIN,
      password: 'superadmin',
    },
    {
      name: 'Refugee Admin',
      email: 'refugeeadmin@ncfrmi.com',
      role: UserRole.REFUGEE_ADMIN,
      password: 'refugeeadmin',
    },
    {
      name: 'Migrant Admin',
      email: 'migrantadmin@ncfrmi.com',
      role: UserRole.MIGRANT_ADMIN,
      password: 'migrantadmin',
    },
    {
      name: 'IDP Admin',
      email: 'idpadmin@ncfrmi.com',
      role: UserRole.IDP_ADMIN,
      password: 'idpadmin',
    },
  ];

  for (let admin of admins) {
    const hashedPassword = await argon2.hash(admin.password);
    const adminUser = await prisma.user.create({
      data: {
        ...admin,
        password: hashedPassword,
      },
    });
    console.log({ adminUser });
  }
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.log(e);
  });
