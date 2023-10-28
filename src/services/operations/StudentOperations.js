import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { studentEndpoints } from "../apis";

const {
    POST_CREATE_STUDENT_API,
    PUT_DISPLAY_PICTURE_STUDENT_API,
    POST_CERTIFICATE_APPLICATION_API,
    GET_CERTIFICATES_API
} = studentEndpoints;

export const createStudent = async (values) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try {
        const response = await apiConnector("POST", POST_CREATE_STUDENT_API, values);
        console.log("Created student .....", response);
        if (!response?.data?.success) {
            throw new Error(response.data.message)
        }
        result = response.data;
    } catch (error) {
        console.log("Cannot create student error ......", error);
        result = error.response.data;
    }
    toast.dismiss(toastId);
    return result;
};

export const dpInstitute = async (id) => {
    const toastId = toast.loading("Loading...");
    const url =`${PUT_DISPLAY_PICTURE_STUDENT_API}?id=${id}`
    let result = null;
    try {
        const response = await apiConnector("PUT", url);
        console.log("DP of student .....", response);
        if (!response?.data?.success) {
            throw new Error(response.data.message)
        }
        result = response.data;
    } catch (error) {
        console.log("Cannot chage Dp of student error ......", error);
        result = error.response.data;
    }
    toast.dismiss(toastId);
    return result;
};

export const cerificateApplication = async (id) => {
    const toastId = toast.loading("Loading...");
    const url =`${POST_CERTIFICATE_APPLICATION_API}?id=${id}`
    let result = [];
    try {
        const response = await apiConnector("POST", url);
        console.log("Cerificate application .....", response);
        if (!response?.data?.success) {
            throw new Error(response.data.message)
        }
        result = response.data;
    } catch (error) {
        console.log("Cannot apply for certifiacte error ......", error);
        result = error.response.data;
    }
    toast.dismiss(toastId);
    return result;
};

export const getCerificates = async (id) => {
    const toastId = toast.loading("Loading...");
    const url =`${GET_CERTIFICATES_API}?id=${id}`
    let result = [];
    try {
        const response = await apiConnector("GET", url);
        console.log("Cerificates .....", response);
        if (!response?.data?.success) {
            throw new Error(response.data.message)
        }
        result = response.data;
    } catch (error) {
        console.log("Cannot get certifiactes error ......", error);
        result = error.response.data;
    }
    toast.dismiss(toastId);
    return result;
};