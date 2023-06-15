// users
const createNewUser = (userData, stateUserList) => {
  const updatedUserList = [...stateUserList, userData];
  localStorage.setItem('user-list', JSON.stringify(updatedUserList));

  return updatedUserList;
};

const editPrevUser = (userData) => {
  const userList = JSON.parse(localStorage.getItem('user-list'));

  const user = userList.find(({ id }) => id === userData.id);
  if (user.currency !== userData.currency) {
    localStorage.removeItem(user.id);
  }

  user.name = userData.name;
  user.currency = userData.currency;

  localStorage.setItem('user-list', JSON.stringify(userList));
  return userList;
};

const removePrevUser = (userId) => {
  const userList = JSON.parse(localStorage.getItem('user-list'));

  const updatedUserList = userList.filter(({ id }) => id !== userId);

  localStorage.setItem('user-list', JSON.stringify(updatedUserList));
  localStorage.removeItem(userId);
  return updatedUserList;
};

export const handleUsers = (userInfo, stateUserList = null) => {
  if (stateUserList) {
    return createNewUser(userInfo, stateUserList);
  }
  if (typeof userInfo === 'string') {
    return removePrevUser(userInfo);
  }
  return editPrevUser(userInfo);
};

// wallet
const createNewExpense = (userId, expenses, expenseData) => {
  const updatedExpenses = [...expenses, expenseData];

  localStorage.setItem(userId, JSON.stringify(updatedExpenses));
  return updatedExpenses;
};

const editPrevExpense = (userId, expenseId, expenses, expenseData) => {
  const { description, tag, value, method, currency } = expenseData;

  const expenseToEdit = expenses.find(({ id }) => id === expenseId);

  expenseToEdit.description = description;
  expenseToEdit.tag = tag;
  expenseToEdit.value = Number(value);
  expenseToEdit.method = method;
  expenseToEdit.currency = currency;

  localStorage.setItem(userId, JSON.stringify(expenses));
  return expenses;
};

const removePrevExpense = (userId, expenseId, expenses) => {
  const updatedExpenses = expenses.filter(({ id }) => id !== expenseId);

  localStorage.setItem(userId, JSON.stringify(updatedExpenses));
  return updatedExpenses;
};

export const handleExpenses = (
  { expenseData = undefined, idToRemove = undefined },
  { idToEdit = undefined, expenses, walletUserId },
) => {
  if (!idToEdit && expenseData) {
    return createNewExpense(walletUserId, expenses, expenseData);
  }
  if (expenseData) {
    return editPrevExpense(walletUserId, idToEdit, expenses, expenseData);
  }
  return removePrevExpense(walletUserId, idToRemove, expenses);
};
