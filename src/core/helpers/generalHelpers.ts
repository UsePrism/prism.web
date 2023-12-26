export const groupError = (data: any) => {
  if (data.length < 1) return {};

  var groupedData = data.reduce((acc: any, item: any) => {
    if (!acc[item.propertyName]) {
      acc[item.propertyName] = [];
    }
    acc[item.propertyName].push(item);
    return acc;
  }, {});

  return groupedData;
};
