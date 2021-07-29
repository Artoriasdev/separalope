import { Formik } from 'formik';
import React, { Component } from 'react';

export class Form extends Component {
  

  handleSubmitting = (formModel) =>{

    console.log(formModel);

  }

  render () {
    
    return (

      <Formik
      ref = {(ref) => (this.form =ref)}
      initialValues={{
        nombre : "",
        correo :""
      }}
      onSubmit={(values , {setSubmitting}) =>{
        setSubmitting(false);
        const formModel = {
          name : "",
          email : "",
        };

        formModel.name = values.nombre;
        formModel.email = values.correo;

        this.handleSubmitting(formModel);
      }}
      >
      {({
        values,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                errors,
                touched,
      }) => (

      <form name="formSubmit" onSubmit = {handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input className="form-control" name="nombre" value={values.nombre} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            name="correo"
            placeholder="name@example.com"
            value={values.correo}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <button className="form-control btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
      )  }
      

      </Formik>
    );
  }

};
