// users
const createNewUser = (userData, stateUserList) => {
  const updatedUserList = [...stateUserList, userData];
  localStorage.setItem('user-list', JSON.stringify(updatedUserList));
  return updatedUserList;
};

const removePrevUser = (userId) => {
  const userList = JSON.parse(localStorage.getItem('user-list'));
  const updatedUserList = userList.filter(({ id }) => id !== userId);
  localStorage.setItem('user-list', JSON.stringify(updatedUserList));
  localStorage.removeItem(userId);
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
const saveNewExpense = (userId, expenses, expenseData) => {
  const updatedExpenses = [...expenses, expenseData];
  localStorage.setItem(userId, JSON.stringify(updatedExpenses));
  return updatedExpenses;
};

const saveEditedExpense = (userId, expenseId, expenses, expenseData) => {
  const expensesCopy = [...expenses];
  const { description, tag, value, method, currency } = expenseData;
  const expenseToEdit = expensesCopy.find(({ id }) => id === expenseId);
  expenseToEdit.description = description;
  expenseToEdit.tag = tag;
  expenseToEdit.value = Number(value);
  expenseToEdit.method = method;
  expenseToEdit.currency = currency;
  localStorage.setItem(userId, JSON.stringify(expensesCopy));
  return expensesCopy;
};

const saveWithoutRemovedExpense = (userId, expenseId, expenses) => {
  const expensesCopy = expenses.filter(({ id }) => id !== expenseId);
  localStorage.setItem(userId, JSON.stringify(expensesCopy));
  return expensesCopy;
};

export const handleExpenses = (
  { expenseData = undefined, idToRemove = undefined },
  { idToEdit = undefined, expenses, walletUserId },
) => {
  if (!idToEdit && expenseData) {
    return saveNewExpense(walletUserId, expenses, expenseData);
  }
  if (expenseData) {
    return saveEditedExpense(walletUserId, idToEdit, expenses, expenseData);
  }
  return saveWithoutRemovedExpense(walletUserId, idToRemove, expenses);
};
