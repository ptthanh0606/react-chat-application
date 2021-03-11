export const downConversation = function (data) {
  return data.map((d, idx) => ({
    ...d,
    isActive: idx === 0 ? true : false,
  }));
};
