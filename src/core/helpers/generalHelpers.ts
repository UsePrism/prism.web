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

export const createImageFromSVG = (svg: any) => {
  const blob = new Blob([svg]);
  return URL.createObjectURL(blob);
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
        message: data?.message,
        data: data,
        errors: null,
      };
      break;
    case 204:
      response = {
        status: true,
        statusCode: status,
        message: "Request was successful",
        data: null,
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
      console.log(data);
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

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const monthName = date.toLocaleString("default", { month: "short" });

  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${monthName} ${day}, ${year}`;
};

export const isObjectEmpty = (obj: any) => {
  if (obj === null) return true;
  return Object.keys(obj).length === 0;
};

export const openInNewTab = (url?: string | any) => {
  if (url == null || url?.length < 1) {
    return;
  }
  var isChrome = navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
  if (isChrome) {
    openNewBackgroundTab(url);
  } else {
    window.open(url, "_blank", "noopener,noreferrer");
  }
};

// TODO: Fix open new tab in background, current functon does not work
export const openNewBackgroundTab = (url: string) => {
  var a = document.createElement("a");
  a.href = url;
  var evt: any = document.createEvent("MouseEvents");
  //the tenth parameter of initMouseEvent sets ctrl key
  evt.initMouseEvent(
    "click",
    true,
    true,
    window,
    0,
    0,
    0,
    0,
    0,
    true,
    false,
    false,
    false,
    0,
    null,
  );
  a.dispatchEvent(evt);
};

export const addEllipsis = (word: string) => {
  return word.length > 30 ? word.substring(0, 30) + "..." : word;
};
