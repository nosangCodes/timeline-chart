import data from "../data/series.json";
import users from "../data/users.json";
export function formatData() {
  const result = {};
  for (const user of users.users) {
    result[user.id] = {
      name: user.name,
      data: [],
    };
  }

  function processData(labels) {
    for (const key in labels) {
      const items = labels[key];
      if (items?.[0]?.userId) {
        for (const item of items) {
          result[item.userId].data.push({
            x: key,
            y: [
              new Date(item.startDate).getTime(),
              new Date(item.endDate).getTime(),
            ],
          });
        }
      } else {
        const nestedItems = labels[key];
        if (nestedItems && nestedItems?.length > 0) {
          for (const ni of nestedItems) {
            processData(ni);
          }
        }
      }
    }
  }

  processData(data);
  console.log(result);
  const res = Object.entries(result).map((entry) => {
    return entry?.[1];
  });
  console.log(res);
  return res;
}
