import React from 'react';
import { withFormik, Form, Field } from "formik";
import * as yup from 'yup';

function LogInForm (props){
  const {errors }= props;
  console.log(errors)
 return(
   <Form>
    {errors.name && <p className='error'>{errors.name}</p>}
    <Field type="text" name="name" placeholder="name"/>
    {errors.email && <p className='error'>{errors.email}</p>}
    <Field type="email" name="email" placeholder=" email"/>
    {errors.password && <p className='error'>{errors.password}</p>}
    <Field type="password" name="password" placeholder="password"/>
    <label>     
      <Field type="checkbox" name="service" />
       <span>Terms Of Service</span>
    </label>
    {errors.service && <p className='error'>{errors.service}</p>}
    <button type="submit">Submit</button>
   </Form>
  )
};

export default withFormik({
   mapPropsToValues: (values) => {
     return {
       name: values.name || '',
       email: values.email || '',
       password: values.password || '',
       service: values.service || ''
     }
   },
   validationSchema: yup.object().shape({
      name:yup.string().required("Username is required"),
      email:yup.string().required('Your Email is Required'),
      password:yup.string().required() .min(8, 'Should be at lease 8 characters'),
      service:yup.boolean().oneOf([true], 'Must Accept Terms Of Service Policy')     
   }),
   handleSubmit: (values) => {
      console.log(values);
   }
})(LogInForm);