import { generateUploadLink } from "core/services/api/businessapi";
import notification from "./notification";
import axios from "axios";

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
    case 200 || 204:
      response = {
        status: true,
        statusCode: status,
        message: data?.message,
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
        message: data?.description,
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

export const uploadFile = async (file: File) => {
  var generatedId = "";
  if (file != null) {
    var ext: any = file?.name?.split(".").pop();
    var apiRes = await generateUploadLink(ext);
    var res: any = handleApiResponse(apiRes);

    if (res?.status) {
      const { uploadLink, assetId } = res?.data?.data;

      var uploadToS3 = await uploadImageToS3(file, uploadLink, ext);

      console.log(uploadToS3);

      if (uploadToS3?.status) {
        generatedId = assetId;
      } else {
        notification({
          message:
            "Unable to upload file at the moment, please try again later.",
          type: "danger",
        });
      }
    } else {
      notification({
        message: res?.message,
        type: "danger",
      });
    }
  }

  return generatedId;
};

export const uploadImageToS3 = async (
  file: File,
  s3Link: string,
  ext: string,
) => {
  const options: any = {
    url: s3Link,
    method: "PUT",
    headers: {
      "Content-Type": `.${ext}`,
    },
    body: file,
  };

  return axios(options)
    .then((response) => response)
    .catch((error) => {
      if (error?.message === "Network Error") {
        return {
          message: "Please check you have an intenet connection",
          data: {},
        };
      } else {
        if (error?.response?.status === 401) {
          notification({
            title: "",
            type: "warning",
            message: "Please logout and sign in again",
          });
        }
        return error?.response;
      }
    });
};

export const isNumeric = (str: string) => {
  return /^\d+$/.test(str);
};

export const numbersOnly = (e: any) => {
  if (isNaN(e?.key) && e?.key !== "Backspace") {
    e.preventDefault();
  }
};
