export const downContacts = (collection = []) => {
  return collection.map((data, idx) => ({
    uuid: data.uuid || console.log("uuid field not existed!"),
    nickname: data.nickname || console.log("nickname field is not existed!"),
    isActive: idx === 0 ? true : false,
  }));
};
