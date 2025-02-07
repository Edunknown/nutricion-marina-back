export const cleanUser = user => {
	delete user.password;
	delete user.createdAt;
	delete user.updatedAt;
	delete user.deletedAt;
	return user;
};
