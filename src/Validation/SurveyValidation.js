import * as yup from "yup";

export const surveySchema = yup.object().shape({
    sex: yup.string().required("Required"),
    age: yup.number("must be a number").positive("must be positive").integer().required("Required"),
    weight: yup.number("must be a number").positive("must be positive").integer().required("Required"),
    height: yup.number("must be a number").positive("must be positive").integer().required("Required"),
    systolic: yup.string().required("Required"),
    chol: yup.string().required("Required"),
    glyc: yup.number().required("Required"),
    hdl:yup.number().required("Required"),
    diabete: yup.string().required("Required"),
    infarctus: yup.string().required("Required"),
    afInfarctus: yup.string().required("Required"),
    afCancer: yup.string().required("Required"),
    smoke: yup.string().required("Required"),
    alim: yup.string().required("Required"),
    physical: yup.string().required("Required"),
    alcohol: yup.string().required("Required")
    



})