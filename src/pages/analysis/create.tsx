import { useState } from "react";
import { Field } from "formik";

import { Container } from "modules";
import { useHooks } from "hooks";
import { Fields, Button } from "components";

const Analysis = ({ showCreateModal, createModal }: any): JSX.Element => {
  const { t, get } = useHooks();
  let data = createModal.data && createModal?.data

  return (
    <div>
      <Container.Form
        url={get(data, "_id") ? `analysis/${get(data, "_id")}` : "analysis"}
        method={get(data, "_id") ? "put" : "post"}
        name="analysis"
        configs={{
          headers: { "Content-Type": "multipart/form-data" },
        }}
        fields={[
          {
            name: "name",
            type: "string",
            required: true,
            value: get(data, "name")
          },
          {
            name: "number",
            type: "number",
            required: true,
            value: get(data, "number")
          },
          {
            name: "analysisType",
            type: "string",
            required: true,
            value: get(data, "analysisType")
          },
          {
            name: "file",
            required: true,
            value: get(data, "file")
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["analysis"] });
          resetForm();
          showCreateModal(false);
        }}
        onError={(error) => {
          console.log("Error", error);
        }}
      >
        {({ isSubmitting, setFieldValue, errors, values }) => {
          return (
            <div>
              <div className="w-full mt-[30px]">
                <div>
                  <Field
                    component={Fields.Input}
                    name="name"
                    size="large"
                    type="string"
                    placeholder={t("name")}
                  />
                  <Field
                    component={Fields.Input}
                    name="number"
                    type="number"
                    placeholder={t("number")}
                    size="large"
                  />
                  <Field
                    component={Fields.Input}
                    name="analysisType"
                    type="analysisType"
                    placeholder={t("analysisType")}
                    size="large"
                  />
                  <Field
                    component={Fields.FileUpload}
                    setFieldValue={setFieldValue}
                    rootClassName="mb-[40px]"
                    name="file"
                    type="file"
                  />
                  <div className="flex justify-end mt-[20px]">
                    <Button
                      title={t("Save")}
                      size="large"
                      htmlType="submit"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Container.Form>
    </div>
  );
};

export default Analysis;