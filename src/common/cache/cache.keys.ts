export const CacheKeys = {
  // signgle user by id
  user: (id: string) => `user${id}`,

  // user list with pagination
  usersList: (page: number, limit: number) =>
    `users:list:page:${page}:limit:${limit}`,

  //   patters to invalidate all users list keys
  userListPattern: () => `users:list:*`,
};
