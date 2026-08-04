const search = req.query.search || "";

const policies = await prisma.policy.findMany({
  where: {
    OR: [
      {
        policyNumber: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        policyType: {
          contains: search,
          mode: "insensitive",
        },
      },
    ],
  },
});