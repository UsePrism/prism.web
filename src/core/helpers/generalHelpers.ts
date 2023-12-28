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

export const handleApiResponse = (apiRes: any) => {
  var response: GeneralResponse = {
    status: false,
    statusCode: 500,
    message: "An unknown error occured, please try again",
    data: null,
    errors: null,
  };

  if (apiRes == null) return response;

  const { status, data } = apiRes;

  switch (status) {
    case 200:
      response = {
        status: true,
        statusCode: status,
        message: data.message,
        data: apiRes?.data,
        errors: null,
      };
      break;
    case 400:
      var errors = data?.errors;
      response = {
        status: false,
        statusCode: status,
        message: data.detail,
        data: null,
        errors: errors?.length > 0 ? groupError(errors) : null,
      };
      break;
    case 422:
      response = {
        status: false,
        statusCode: status,
        message: data.description,
        data: null,
        errors: null,
      };
      break;
    case 500:
      response = {
        status: false,
        statusCode: status,
        message: data.message,
        data: null,
        errors: null,
      };
      break;

    default:
      break;
  }

  return response;
};
