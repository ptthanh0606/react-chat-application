export const downConversation = function (data, userUUID) {
  return data.map((d, idx) => ({
    ...d,
    recipients: d.recipients.filter((r) => r !== userUUID),
    isActive: idx === 0 ? true : false,
  }));
};
