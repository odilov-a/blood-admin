import React, { useState, useEffect } from "react";
import { Fields } from "components";
import { useNavigate } from "react-router-dom";
import { FastField, Form, Formik } from "formik";
import { useHooks, useDebounce } from "hooks";

const Header = ({setSearchWord}:any) => {

  return (
    <div>
      <h1>Header</h1>
      <Formik initialValues={{ search: "" }} onSubmit={() => {}}>
        {() => {
          return (
            <Form>
              <FastField
                component={Fields.Input}
                placeholder='Search'
                name='search'
                onChange={(e:any) => setSearchWord(e.target.value)}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Header;