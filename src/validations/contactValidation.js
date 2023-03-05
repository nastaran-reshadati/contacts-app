import * as Yup from 'yup';

export const contactSchema = Yup.object().shape({

   fullname : Yup.string().required("نام و نام خانوادگی ضروری است"),
   photo : Yup.string().required('تصویر مخاطب الزامی است'),
   mobile : Yup.string().required('شماره موبایل الزامی است'),
   email : Yup.string().email('آدرس ایمیل وارد شده صحیح نیست').required('آدرس ایمیل الزامی است'),
   job : Yup.string(),
   group : Yup.string().required('انتخاب گروه الزامی است')
})
