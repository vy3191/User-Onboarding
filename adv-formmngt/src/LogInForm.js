import React, {useState,useEffect} from 'react';
import { withFormik, Form, Field } from "formik";
import * as yup from 'yup';
import axios from 'axios';

function LogInForm (props){
  const {errors,touched, status}= props;
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if(status) {
       setUsers([...users, status])
    }
  }, [status])
  
 return(
   <Form>
    { touched.name && errors.name && <p className='error'>{errors.name}</p>}
    <Field type="text" name="name" placeholder="name"/>
    {errors.email && touched.email && <p className='error'>{errors.email}</p>}
    <Field type="email" name="email" placeholder=" email"/>
    {errors.password && touched.password && <p className='error'>{errors.password}</p>}
    <Field type="password" name="password" placeholder="password"/>
    {errors.role && touched.role && <p className='error'>{errors.role}</p>}
    <Field component="select" name="role">
      <option value="">Select your role:</option>
      <option value="Front-End Developer">Front-End Dev</option>
      <option value="Back-End Developer">Back-End Dev</option>
      <option value="Full-Stack Developer">Full-Stack Dev</option>
    </Field>
    <label>     
      <Field type="checkbox" name="service" />
       <span>Terms Of Service</span>
    </label>
    {errors.service && touched.service && <p className='error'>{errors.service}</p>}
    <button type="submit">Submit</button>
    { users.length === 0 ? <p>Loading users...</p> :
      users.map( (user,index) => {
        return(
          <p key={index}>{user.name}:{user.role}</p>
        )
      })
    }
   </Form>
  )
};

export default withFormik({
   mapPropsToValues: (values) => {
     return {
       name: values.name || '',
       email: values.email || '',
       password: values.password || '',
       role: values.role || '',
       service: values.service || ''
     }
   },
   validationSchema: yup.object().shape({
      name:yup.string().required("Username is required"),
      email:yup.string().required('Your Email is Required'),
      password:yup.string().required() .min(8, 'Should be at lease 8 characters'),
      role:yup.string().required('Choose your role'),
      service:yup.boolean().oneOf([true], 'Must Accept Terms Of Service Policy')     
   }),
   handleSubmit: (values, {setStatus}) => {
      console.log(values);
      axios.post("https://reqres.in/api/users", values)
           .then( res => {              
              setStatus(res.data);

           })
           .catch( error=> {
              console.log(error)
           })
   }
})(LogInForm);